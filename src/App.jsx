import Header from './components/Header/Header'
import Statement from './components/Statement/Statement'

import './index.css'

function App() {

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container">
            <Statement />
          </div>
        </section>
      </main>
    </>
  )
}

export default App
