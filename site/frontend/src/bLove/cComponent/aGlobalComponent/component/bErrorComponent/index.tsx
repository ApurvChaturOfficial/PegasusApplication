import React from 'react'


const ErrorComponent = (props: any) => {
  // Destructure Props
  const { message } = props;

  // JSX
  return (
    <React.Fragment>
      {/* ErrorComponent */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }} >
        {message || "Waiting..."}
      </div>
    </React.Fragment>
  )
}

export default ErrorComponent;
