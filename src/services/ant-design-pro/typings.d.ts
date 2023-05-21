// @ts-ignore
/* eslint-disable */

declare namespace API {
  type ResponseBasic = {
    code: string;
    data?: object;
    message?: string;
  };

  type CurrentUser = {
    name?: string;
    role?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
  type UserListItem = {
    id?: string;
    name?: string;
    status?: string;
    role?: {
      type?: string;
      label?: string;
    };
    username?: string;
    password?: string;
  };
  type UserList = {
    data?: {
      userList?: UserListItem[];
      total?: number;
    };
    code?: string;
    msg?: string;
  };
  type CreateUserParams = {
    name?: string;
    roleType?: string;
    roleLabel?: string;
    username?: string;
    password?: string;
    status?: string;
  };
  type DeleteUserParams = {
    id?: string;
  };
  type CreateUserResult = {
    code?: string;
    message?: string;
    data?: string;
  };
}
