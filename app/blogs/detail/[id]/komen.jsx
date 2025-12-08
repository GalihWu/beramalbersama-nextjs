import React from 'react';

export const Komen = () => {
  const comments = [
    {
      name: 'Yanto',
      time: '10 Jam yang lalu',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo lacus eget mauris lacinia, et tristique orci mattis. Sed sed sapien suscipit sem lacinia aliquet ultrices at diam.',
    },
    {
      name: 'Yanto',
      time: '15 Jam yang lalu',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo lacus eget mauris lacinia, et tristique orci mattis. Sed sed sapien suscipit sem lacinia aliquet ultrices at diam.',
    },
    {
      name: 'Yanto',
      time: 'Kemarin',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo lacus eget mauris lacinia, et tristique orci mattis. Sed sed sapien suscipit sem lacinia aliquet ultrices at diam.',
    },
  ];

  return (
    <div>
      <p className="text-18 text-strong">
        Komentar <span className="text-cyan">({comments.length})</span>
      </p>
      <div className="blog-comment-list">
        {comments.map((comment, index) => (
          <div key={index} className="comment-item">
            <p className="text-strong mb-0">{comment.name}</p>
            <p className="text-12 text-thin mb-2">{comment.time}</p>
            <p>{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
