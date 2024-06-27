import css from "./HomePage.module.css"

 const HomePage = () => {
  return (
    <>
      {/* <DocumentTitle>Home</DocumentTitle> */}

      <div className={css.container}>
        <h1 className={css.title}>
          Contact book manager welcome page{' '}
          <span role='img' aria-label='Greeting icon'>
            💁‍♀️
          </span>
        </h1>
      </div>
    </>
  );
}
export default HomePage
