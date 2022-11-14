import * as React from 'react';
import Header from "../Header";

const Layout : React.FC<{children : React.ReactNode}> = ({children}) => {
    return (
        <div>
          <Header />
          <div>
            {children}
          </div>
        </div>
      )
}

export default Layout;
