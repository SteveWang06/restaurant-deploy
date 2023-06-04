import { ConfigProvider, MessageHandler, Router, SharedProvider, StoreProvider } from "./components/wrapper"
import  paths  from "./constants/paths"



function App() {

  return (
    <StoreProvider>
      
        <ConfigProvider>
          <MessageHandler>
            <SharedProvider>
              <Router defaultRoute={paths.food} />
            </SharedProvider>
          </MessageHandler>
        </ConfigProvider>
      
    </StoreProvider>
  )
}

export default App
