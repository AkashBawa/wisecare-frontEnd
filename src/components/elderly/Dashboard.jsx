import { Outlet } from "react-router-dom"
import { Radio, Tabs } from 'antd';
import MyPosts from './myPosts';

const Dashboard = () => {
  return (
    <div className="dashBoardElder">
      <h1>Hi, Ana</h1>
      <div className="dashElder">
        <div className="dashElderEvent">
          <h3>Join our Community</h3>
          <h4>Join us for our upcoming yoga session.</h4>
          <button className="eventMore">Read More</button>
        </div>
        <div className="dashElderUnanswered">
          <h3>Unanswered</h3>
          <div className="unansCount">0</div>
        </div>
        <div className="dashElderPending">
          <h3>Pending</h3>
          <div className="pendingCount">0</div>
        </div>
      </div>


      <h1>Appointments</h1>
      <Tabs className="tabs"
        defaultActiveKey="1"
        type="card"
        size={"middle"}
        items={
          [
            {
              label: `Unanswered`,
              key: "1",
              children: <MyPosts />,
            },
            {
              label: `Pending`,
              key: "2",
              children: <MyPosts />,
            },
            {
              label: `Approved`,
              key: "3",
              children: <MyPosts />,
            },
            {
              label: `Completed`,
              key: "4",
              children: <MyPosts />,
            },
          ]
        }
      />


      <article>
        <table className="appoTable">
          <tr>
            <th>Name</th>
            <th>Task</th>
            <th>Data and Time</th>
            <th>accept</th>
            <th>reject</th>
            <th>profile</th>
          </tr>
          <tr className="row1">
            <td>Ahmed C.</td>
            <td>Do groceries and bring them home.</td>
            <td>Oct 16,2023 10am</td>
            <td>accept</td>
            <td>reject</td>
            <td>profile</td>
          </tr>
          <tr className="row2">
            <td>Jessica R.</td>
            <td>Take me to a doctor appointment.</td>
            <td>Oct 25,2023 2pm</td>
            <td>accept</td>
            <td>reject</td>
            <td>profile</td>
          </tr>

        </table>
      </article>
    </div>


  )
}

export default Dashboard
