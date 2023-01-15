import { Groups, Prisma, User } from "@prisma/client";
import dborm from "../db";
import { hasDuplicates } from "../utils/hasDublicate";

class GroupService {
  private Group: Prisma.GroupsDelegate<
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation
  >;
  constructor() {
    this.Group = dborm.client.groups;
  }

  async protect(creatorId: number, memberId: number): Promise<boolean> {
    try {
      // const protectedVals: any = await db.pool.query(
      //   `
      //   select * from group_member where id IN (${creatorId}, ${memberId});
      //   select * from groups where ${memberId} = ALL (wait_confirm);
      //   `
      // );
      await this.Group.updateMany({ where: {}, data: {} });
      const group = await this.Group.findMany({
        where: {
          members: {
            hasSome: creatorId,
          },
          wait_confirm: {
            hasSome: memberId,
          },
        },
      });
      return !!group.length;
      // const membersGroupArr: number[] = protectedVals[0].rows.map(
      //   (item: GroupMember) => item.group_id
      // );
      // const waitingGroupArr: number[] = protectedVals[1].rows.map(
      //   (item: Groups) => item.id
      // );
      // const potected = hasDuplicates([...membersGroupArr, ...waitingGroupArr]);

      // return potected;
    } catch (error) {
      return error;
    }
  }
  async createGroup(sender: number, receiver: number): Promise<Groups> {
    try {
      const protec = await this.protect(sender, receiver);
      console.log(protec);

      if (!protec) throw Error("Группа с этим пользователем уже существует");

      const group = await this.Group.create({
        data: {
          members: [sender],
          wait_confirm: [receiver],
        },
      });
      return group;
    } catch (error) {
      return error;
    }
  }
  async removeGroup(id: number): Promise<{}> {
    try {
      const purchase = await this.Group.delete({ where: { id } });
      //удалить у пользовыателей группы
      if (!purchase) {
        throw Error(`Not found group where id ${id}`);
      }
      return true;
    } catch (error) {
      return error;
    }
  }
  async addMember(groupId: number, member: Omit<User, "pass">): Promise<{}> {
    try {
      const groupData = await this.Group.findUnique({ where: { id: groupId } });
      const group = await this.Group.update({
        where: { id: groupId },
        data: {
          members: {
            push: member.id,
          },
          wait_confirm: groupData.wait_confirm.filter(
            (item) => item !== member.id
          ),
        },
      });
      //добавить в масив групп у юзера эту группу
      console.log(group);
      // const group: QueryResult<GroupMember> = await db.pool.query(
      //   `INSERT INTO group_member (group_id, id) values ($1, $2) RETURNING *`,
      //   [groupId, member.id]
      // );
      // console.log(group);
      // const user = await db.pool.query(
      //   `UPDATE users set groups = array_append(groups, ${groupId}) where id = ${member.id} RETURNING *`
      // );
      // console.log(user);
      // return { group: group.rows[0].group_id, user: user.rows[0] };
    } catch (error) {
      return error;
    }
  }
  async removeMember(): Promise<{}> {
    try {
      return;
    } catch (error) {
      return error;
    }
  }
}

export default new GroupService();
