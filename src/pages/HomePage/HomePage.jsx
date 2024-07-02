import css from "./HomePage.module.css"

 const HomePage = () => {
  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>
          welcome to the contact book app{' '}
          <span role='img' aria-label='Notebook icon'>
             <span role='img' aria-label='Notebook icon'>
            📔
          </span>
          </span>
        </h1>
      </div>
    </>
  );
}
export default HomePage
