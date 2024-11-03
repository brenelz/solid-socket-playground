import { createSignal } from "solid-js"
import { useSocket } from "~/lib/notification-socket";
import { createSocketMemo } from "../../socket/lib/shared";

export default function Notifications() {
  const [userId, setUserId] = createSignal('1');
  const socket = useSocket(createSocketMemo(userId));

  return (
    <>
      <button onClick={() => {
        if (userId() === '1') {
          setUserId('2');
        } else {
          setUserId('1');
        }
      }}>Change user</button>
      <p>Your Notifications ({userId()})</p>

      {socket.notifications()?.length} notifications

      <p>Send Notifications</p>
      <p><button onClick={() => socket.sendNotification(userId())}>Send</button></p>
    </>
  )
}