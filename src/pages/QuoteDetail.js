import { useParams, Route } from "react-router-dom";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';


const DUMMY_QUOTES = [
  {id: 'q1', author: 'Max', text: 'Learning React is fun!'},
  {id: 'q2', author: 'Max', text: 'Learning React is fun!'},
]


const QuoteDetail = () => {
  const params = useParams();

  const quote = DUMMY_QUOTES.find(quote => quote.id === params.quoteId)

  if (!quote) {
    return <p>No quote found!</p>
  }

  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/quotes/${params.quoteId}/comments`}>
        <Comments />
      </Route>
    </div>
  );
};

export default QuoteDetail;