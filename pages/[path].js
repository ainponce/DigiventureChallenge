import input from "../models/inputs.json"
import FormularioGenerico from "./formularioGenerico.jsx"
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  const { path } = router.query;

  if (input[path]) {
    return <FormularioGenerico path={path} />;
  } else {
    return (
      <>
        <h1>404 - Not Found</h1>
      </>
    );
  }
}

Page.getInitialProps = async ({ res, query }) => {
  if (!input[query.path]) {
    res.statusCode = 404;
  }
  return { path: query.path };
};

export default Page;