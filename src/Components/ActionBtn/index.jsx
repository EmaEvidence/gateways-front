const ActionBtn = ({onClick, icon, atn}) => {
  return (
    <button className='action-btn' onClick={onClick}>
      <img src={icon} alt={atn} />
    </button>
  )
};

export default ActionBtn;
