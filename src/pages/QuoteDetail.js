import { useParams, useRouteMatch, Route, Link } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from '../hooks/use-http';
import { getSingleQuote } from "../lib/api";


const DUMMY_QUOTES = [
  {id: 'q1', author: 'Max', text: 'Learning React is fun!'},
  {id: 'q2', author: 'Maximillian', text: 'Learning React is great!'},
]


const QuoteDetail = () => {
  const match = useRouteMatch();
  const params = useParams();

  const { quoteId } = params;

  const { sendRequest, status, data:loadedQuote, error } = useHttp(getSingleQuote, true);

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId)

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === 'pending') {
    return <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if (error) {
    return <p className='centered'>{error}</p>
  }

  // if (!loadedQuote.text) {
  if (!quote) {
    return <p>No quote found!</p>
  }

  return (
    <div>
      {/* <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} /> */}
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className='btn--flat' to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;
