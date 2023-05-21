import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { PageLoading, SettingDrawer } from '@ant-design/pro-components';
import { history, Link } from 'umi';
import defaultSettings from '../config/defaultSettings';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/user';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

// export const request: RequestConfig = {
//   request: {
//     dataField: '',
//   },
// };

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs" key="docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )}
        </>
      );
    },
    ...initialState?.settings,
  };
};
// const authHeaderInterceptor = (url: any, options: any) => {
//   const baseUrl = process.env.NODE_ENV === 'development' ? '/api' : 'https://xxx.xxx.com:9001'; //如果是开发环境走本地代理/API,否则就是正式环境
//   const token = localStorage.getItem('userToken');
//   const o = options;
//   if (history.location.pathname !== loginPath && token) {
//     //判断当前是否登陆也，用户有没有登陆
//     o.headers = {
//       username: token,
//     };
//   }
//   return {
//     url: baseUrl + url,
//     options: o,
//   };
// };
//拦截器-响应后拦截
// 错误处理方案： 错误类型
// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9,
// }
// 与后端约定的响应数据格式
// interface ResponseStructure {
//   success: boolean;
//   data: any;
//   errorCode?: number;
//   errorMessage?: string;
//   showType?: ErrorShowType;
// }
function authHeaderInterceptor(url, options) {}
export const request = {
  // 当后端接口不满足该规范的时候你需要通过该配置把后端接口数据转换为该格式，
  // 该配置只是用于错误处理，不会影响最终传递给页面的数据格式
  // errorHandler: (error: any) => {
  //   // if (opts?.skipErrorHandler) throw error;
  //   // 我们的 errorThrower 抛出的错误。
  //   if (error.name === 'BizError') {
  //     const errorInfo: ResponseStructure | undefined = error.info;
  //     if (errorInfo) {
  //       const { errorMessage, errorCode } = errorInfo;
  //       switch (errorInfo.showType) {
  //         case ErrorShowType.SILENT:
  //           // do nothing
  //           break;
  //         case ErrorShowType.WARN_MESSAGE:
  //           message.warn(errorMessage);
  //           break;
  //         case ErrorShowType.ERROR_MESSAGE:
  //           message.error(errorMessage);
  //           break;
  //         case ErrorShowType.NOTIFICATION:
  //           notification.open({
  //             description: errorMessage,
  //             message: errorCode,
  //           });
  //           break;
  //         case ErrorShowType.REDIRECT:
  //           // TODO: redirect
  //           break;
  //         default:
  //           message.error(errorMessage);
  //       }
  //     }
  //   } else if (error.response) {
  //     // Axios 的错误
  //     // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
  //     message.error('Response status:', error.response.status);
  //   } else if (error.request) {
  //     // 请求已经成功发起，但没有收到响应
  //     // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
  //     // 而在node.js中是 http.ClientRequest 的实例
  //     message.error('None response! Please retry.');
  //   } else {
  //     // 发送请求时出了点问题
  //     message.error('Request error, please retry.');
  //   }
  // },
  // errorThrower: (res: ResponseStructure) => {
  //   console.log('errorThrower');

  //   const { success, data, errorCode, errorMessage, showType } = res;
  //   if (!success) {
  //     const error: any = new Error(errorMessage);
  //     error.name = 'ResponseError';
  //     error.info = { errorCode, errorMessage, showType, data };
  //     throw error; // 抛出自制的错误
  //   }
  // },
  // errorConfig: {
  //   adaptor: (resData) => {
  //     // console.log('adaptor', resData);
  //     return {
  //       ...resData,
  //       // status: resData.code === 200,
  //       // errorMessage: resData.message,
  //     };
  //   },
  // },
  // errorThrower: errorThrower,

  // 新增自动添加AccessToken的请求前拦截器
  requestInterceptors: [
    async (url, options) => {
      const token = localStorage.getItem('token');
      const o = options;
      if (history.location.pathname !== loginPath && token) {
        o.headers = { ...o.headers, token };
      }
      return {
        url,
        options: o,
      };
    },
  ],
  responseInterceptors: [
    async (response, options) => {
      // if (history.location.pathname !== loginPath) {
      // console.log(response);
      const res = await response.clone();
      // console.log('response', res, response);
      // if (res?.code && res?.code === '200') {
      //   //成功之后返回什么
      //   // const {sacpresult} = res.result;
      //   // const { data } = res;
      //   // console.log(data);
      //   return res;
      // } else {
      //   //失败之后返回什么
      //   message.error(res.message);
      // }
      return res;
    },
  ],
};
