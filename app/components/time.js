const Time = ({ time }) => {
    return (
      <span>
        {time.toLocaleTimeString({
          hour: 'numeric',
          minute: '2-digit'
        })}
      </span>
    );
  };

  export default Time;