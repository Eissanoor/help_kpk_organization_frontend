const Toast = ({ message, visible }) => {
    if (!visible) return null;
  
    return (
      <div className="fixed bottom-1 right-4 bg-red-500 text-white py-2 px-4 rounded shadow-lg">
        {message}
      </div>
    );
  };
  
  export default Toast;