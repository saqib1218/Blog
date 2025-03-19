import React, { useEffect, useState } from 'react';
import { useGetFriendsQuery } from '../features/api/apiSlice'

const UserList = ({ onUserClick }) => {
  const { data: friends, isLoading } = useGetFriendsQuery();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="User-List">
      {friends?.map((friend) => (
        <div
          key={friend._id}
          className="User-Item"
          onClick={() => onUserClick(friend)}
        >
          <div className="User-Avatar">{friend.name[0]}</div>
          <div className="User-Name">{friend.name}</div>
        </div>
      ))}
    </div>
  );
};

export default UserList;