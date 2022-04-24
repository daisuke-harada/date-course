import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { currentUserState, loginStatusState } from 'store/session';
import { client } from 'lib/api/client';


export const useDeactivateAccountButtonAction = () => {
  const [loginStatus, setLoginStatus] = useRecoilState(loginStatusState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navigate = useNavigate();
  const onCLickDeactivateAccountAction: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    // guestユーザーは退会できなくする。
    if( currentUser.user.id === 1 ){
      navigate(`./`, {state: {message: 'guestユーザーは退会できません', type: 'error-message', condition: true}})
    }else {
      if(window.confirm('本当に退会しますか？')){
        client.delete(`users/${currentUser.user.id}`).then(response => {
          response.data.status === 'deleted' && navigate('/', {state: {message: '退会しました', type: 'success-message', condition: true}} );
          response.data.status === 'deleted' && setLoginStatus({status: false}) && setCurrentUser({user:{}});
        });
      };
    }
  };

  return { onCLickDeactivateAccountAction, loginStatus };
}