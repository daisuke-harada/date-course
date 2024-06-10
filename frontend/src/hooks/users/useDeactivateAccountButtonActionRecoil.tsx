import { useNavigate } from 'react-router-dom';

import { client } from 'lib/api/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { setCurrentUser, setLoginStatus } from 'actions/sessionActions';
import { initialUser } from 'defaults/userDefaults';


export const useDeactivateAccountButtonAction = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loginStatus } = useSelector((state: RootState) => ({
    currentUser: state.session.currentUser,
    loginStatus: state.session.loginStatus,
  }));

  const onCLickDeactivateAccountAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // guestユーザーは退会できなくする。
    if( currentUser.id === 1 ){
      navigate(`./`, {state: {message: 'guestユーザーは退会できません', type: 'error-message', condition: true}})
    }else {
      if(window.confirm('本当に退会しますか？')){
        client.delete(`users/${currentUser.id}`).then(response => {
          if (response.data.status === 'deleted') {
            navigate('/', {state: {message: '退会しました', type: 'success-message', condition: true}});
            dispatch(setLoginStatus(false));
            dispatch(setCurrentUser(initialUser));
          }
        });
      };
    }
  };

  return { onCLickDeactivateAccountAction, loginStatus };
}