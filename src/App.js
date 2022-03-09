import { Formik, Form, Field } from 'formik'
import { useState } from 'react';
import "./header.css"
import "./content.css"
import "./articule.css"

const App = () => {
  const [photos, setPhotos] = useState([])

  const open = (url) => {
    window.open(url)
  }

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const res = await fetch(`https://api.unsplash.com/search/photos?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID 6p9Mg-AzIaxpkJrUDVAAHlEmNS16ZQcb5cBK0tLNGGk'
              }
            })
            const data = await res.json()
            setPhotos(data.results)
          }}>
          <Form>
            <Field
              name={"search"} />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {photos.map(photo => {
            return (
              <article key={photo.id} onClick={() => open(photo.links.html)}>
                <img src={photo.urls.regular} alt={photo.description} />
                <p>{`${photo.alt_description} ${photo.description}`}</p>
              </article>
              )
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
