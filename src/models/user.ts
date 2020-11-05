import { Toast } from 'antd-mobile';
import { fakeAccountLogin } from '@/services/login';
import { queryCurrent } from '@/services/user';
import { Effect, Reducer } from 'umi';
interface CurrentUser {
  name?:string,
  icon?:string,
  userid?:string
}


//当前model的state类型
export interface UserModelState {
  currentUser:CurrentUser
}
//整个model的类型
export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetchCurrent: Effect;
    login: Effect;
    /*queryDetail: Effect;
    logout: Effect;*/
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    //clearUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',
  state: {
    currentUser: {},
    
  },
  //副作用的处理函数
  effects: {
    *fetchCurrent({payload},{call,put}){
      const res = yield call(queryCurrent) //执行异步请求queryCurrent
      yield put({type:"saveCurrentUser",payload:res})
    },
    *login({payload},{call,put}){
      const res = yield call(fakeAccountLogin,payload)
      if(res.status === 1){
        yield put({type:'saveCurrentUser',payload:res})
      }else{
        Toast.fail(res.message || '系统开小差')
      }
    }
  },
  //真正的reducer函数 直接改变state
  reducers: {
    saveCurrentUser(state,action){
      return {...state,currentUser: {...action.payload}||{}}
    }
    
  },
};
export default UserModel;
