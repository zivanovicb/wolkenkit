import ActivePage from './ActivePage';
import Metadata from './Metadata';
import Search from './Search';

const metadata = new Metadata();
const search = new Search({ metadata });

export { ActivePage, Metadata, metadata, search };
