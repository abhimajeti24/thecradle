import React from 'react';
import styled from 'styled-components';

const FileUpload = () => {
  return (
    <StyledWrapper>
      <div className="container"> 
        <div className="header"> 
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> 
              <path d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </g></svg> <p>Browse File to upload!</p>
        </div> 
        <label htmlFor="file" className="footer"> 
          <svg fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M15.331 6H8.5v20h15V14.154h-8.169z" /><path d="M18.153 6h-.009v5.342H23.5v-.002z" /></g></svg> 
          <p>Not selected file</p> 
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M5.16565 10.1534C5.07629 8.99181 5.99473 8 7.15975 8H16.8402C18.0053 8 18.9237 8.9918 18.8344 10.1534L18.142 19.1534C18.0619 20.1954 17.193 21 16.1479 21H7.85206C6.80699 21 5.93811 20.1954 5.85795 19.1534L5.16565 10.1534Z" stroke="#000000" strokeWidth={2} /> <path d="M19.5 5H4.5" stroke="#000000" strokeWidth={2} strokeLinecap="round" /> <path d="M10 3C10 2.44772 10.4477 2 11 2H13C13.5523 2 14 2.44772 14 3V5H10V3Z" stroke="#000000" strokeWidth={2} /> </g></svg>
        </label> 
        <input id="file" type="file" /> 
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    height: 300px;
    width: 300px;
    border-radius: 10px;
    box-shadow: 4px 4px 30px rgba(0, 0, 0, .2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    gap: 5px;
    background-color: rgba(0, 110, 255, 0.041);
  }

  .header {
    flex: 1;
    width: 100%;
    border: 2px dashed royalblue;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .header svg {
    height: 100px;
  }

  .header p {
    text-align: center;
    color: black;
  }

  .footer {
    background-color: rgba(0, 110, 255, 0.075);
    width: 100%;
    height: 40px;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: black;
    border: none;
  }

  .footer svg {
    height: 130%;
    fill: royalblue;
    background-color: rgba(70, 66, 66, 0.103);
    border-radius: 50%;
    padding: 2px;
    cursor: pointer;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.205);
  }

  .footer p {
    flex: 1;
    text-align: center;
  }

  #file {
    display: none;
  }`;

export default FileUpload;
