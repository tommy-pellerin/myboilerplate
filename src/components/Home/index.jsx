import { lazy,Suspense } from "react"; //Suspense est utilisé pour attendre que le composant DisplayPosts soit chargé. Pendant que DisplayPosts est en train de charger (c'est-à-dire, pendant que l'importation asynchrone est en cours), Suspense affiche un composant de repli, qui est <div>Loading...</div>
const DisplayPosts = lazy(() => import('./DisplayPosts'));

function Home() {
  return (
    <div>
      <h1>HOME</h1>
      <div className="my-5">
        <h2>Welcome on My Builderplate !</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <DisplayPosts />
      </Suspense>
    </div>
  );
}

export default Home;