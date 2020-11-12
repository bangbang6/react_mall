import { Toast } from 'antd-mobile';
import { fakeAccountLogin } from '@/services/login';
import { fakeAccountLogout, queryCurrent, queryDetail } from '@/services/user';
import { Effect, Reducer } from 'umi';
interface CurrentUser {
  name?:string,
  icon?:string,
  userid?:string
}

export interface DetailUser {
  name: string;
  icon: string;
  userid: string;
  email: string;
  phone: string;
  address: string;
  signature?: string;
  title?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  country: string;
}
//当前model的state类型
export interface UserModelState {
  currentUser:CurrentUser,
 detail:
  | DetailUser
  | {
      name: string;
      icon: string;
    };
}
//整个model的类型
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    login: Effect;
    queryDetail: Effect;
    logout: Effect;
  };
  reducers: {
    saveUser: Reducer<UserModelState>;
    clearUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    detail: {
      name: '',
      icon: '',
    },
  },
  //副作用的处理函数
  effects: {
    *fetchCurrent({payload},{call,put}){
      const res = yield call(queryCurrent) //执行异步请求queryCurrent
      yield put({type:"saveUser",payload:{currentUser:{...res}}})
    },
    *login({payload},{call,put}){
      const res = yield call(fakeAccountLogin,payload)
      if(res.status === 1){
        yield put({type:'saveUser',payload:{currentUser:{...res}}})
      }else{
        Toast.fail(res.message || '系统开小差')
      }
    },
    *queryDetail({payload},{call,put}){
      const res = yield call(queryDetail)
      yield put({type:"saveUser",payload:{detail:{...res}}})
    },
    *logout({payload},{call,put}){
      const res = yield call(fakeAccountLogout)
      yield put({type:'clearUser',payload:{currentUser:{},detail:{name:"",icon:""}}})
    }
  },
  //真正的reducer函数 直接改变state
  reducers: {
    saveUser(state,action){
      return {...state,...action.payload}
    },
    clearUser(state,action){
      return {...action.payload}
    }
  },
  
};
export default UserModel;
