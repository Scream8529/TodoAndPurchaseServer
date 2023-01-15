import { NotificationKey } from "../models/notification";
import { wraperService } from "../services/wraper.service";
import { Get, Route, Tags, Post, Body, Path, Request, Put } from "tsoa";
import groupService from "../services/group.service";
import { IRequestAfterMidlware } from "../models";
import notificationService from "../services/notification.service";
import userService from "../services/user.service";

@Route("group")
@Tags("Group")
class GroupController {
  @Post("/")
  public async add(
    @Request() req: IRequestAfterMidlware,
    @Body() body: { id: number }
  ): Promise<{}> {
    try {
      const protectedGroup = await groupService.protect(req.user.id, body.id);
      if (protectedGroup) {
        return wraperService.errorResponse([{ message: "Уже есть группа" }]);
      }
      //сделать проверку на существование тому кому надо отправить аявку на группу
      const createdGroup = await groupService.createGroup(req.user.id, body.id);
      const user = await userService.getUserById(req.user.id);

      const group = await groupService.addMember(createdGroup.id, user);
      console.log({ group });

      notificationService
        .add({
          status: 0,
          notification_key: NotificationKey.addToGroup,
          receiver: body.id,
          target_id: createdGroup.id,
        })
        .then(() => {
          console.log("notification created");
        });
      return wraperService.successResponse({ group });
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }

  @Put("/")
  public async remove(
    @Body()
    body: {}
  ): Promise<{}> {
    try {
      const {} = body;
      return wraperService.successResponse({
        message: "",
      });
    } catch (error) {
      return wraperService.errorResponse([{ message: "Server error" }]);
    }
  }
}

const groupController = new GroupController();

export default groupController;
