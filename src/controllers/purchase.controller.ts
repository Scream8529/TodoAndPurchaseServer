import { purchaseService } from "./../services/purchase.service";
import { wraperService } from "./../services/wraper.service";
import {
  AddPurchaseData,
  GetPurchasesData,
  StatePurchaseData,
} from "../models/purchase";
import {
  Get,
  Route,
  Tags,
  Post,
  Body,
  Path,
  Request,
  Delete,
  Put,
  Query,
} from "tsoa";
import { IRequestAfterMidlware, IResponseModel } from "../models";
import { Purchase } from "@prisma/client";

@Route("purchases")
@Tags("Purchase")
class PurchaseController {
  @Get("/")
  async getAll(
    @Request() req: IRequestAfterMidlware,
    @Query() page?: number,
    @Query() page_size?: number
  ): Promise<IResponseModel<{ results?: Purchase[] }>> {
    try {
      const purchases = await purchaseService.getAll({
        id: req.user.id,
        page,
        page_size,
      });
      return wraperService.successResponse(purchases);
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }

  @Post("/")
  async addPerchase(
    @Request() req: IRequestAfterMidlware,
    @Body() body: AddPurchaseData
  ): Promise<IResponseModel<Purchase>> {
    try {
      const { title } = body;
      const author_id = req.user.id;
      if (!title) {
        return wraperService.errorResponse([{ message: "Title by requred" }]);
      }
      const purchase = await purchaseService.add(author_id, title);
      // WsService.sendMessage(String(author_id), purchase);
      return wraperService.successResponse({ ...purchase });
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }

  @Put("/")
  async changePurchaseStatus(
    @Body() body: StatePurchaseData
  ): Promise<IResponseModel<Purchase>> {
    try {
      const { purchaseId, state } = body;
      const purchase = await purchaseService.changeState(purchaseId, state);
      return wraperService.successResponse({ ...purchase });
      // WsService.sendMessage(String(author_id), purchase);
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }

  @Delete("/")
  async removePerchase(@Query() id: number): Promise<IResponseModel<boolean>> {
    try {
      const purchase = await purchaseService.remove(id);
      if (typeof purchase === "boolean") {
        return wraperService.successResponse(true);
      }
      return wraperService.errorResponse([{ message: purchase.message }]);
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }
}
const purchaseController = new PurchaseController();

export default purchaseController;
