/* eslint-disable react/prop-types */
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { concreteSubtleBackground } from '../../utils';
import './styles.scss';
import ArticleCard from '../../components/ArticleCard';
import SearchInput from '../../components/MUI/SearchInput';

const SearcheablePools = ({ allSwimmingPools }) => {
  const [filteredPools, setFilteredPools] = React.useState(allSwimmingPools);

  React.useEffect(() => {
    setFilteredPools(allSwimmingPools);
  }, [allSwimmingPools]);

  const handleSearch = (searchQuery) => {
    const pools = allSwimmingPools.filter(({ heading1, heading2, body }) => (
      `${heading1}${heading2}${body}`.toLowerCase().includes(searchQuery.toLowerCase())
    ));
    setFilteredPools(pools);
  };

  return (
    <div className="mainContent">
      <div className="root large-padding" style={concreteSubtleBackground}>
        <h1 className="sub-section-heading">
          Swimming Pools
          <hr />
        </h1>
        <Box sx={{ display: 'flex', mt: 10, justifyContent: 'center' }}>
          <SearchInput placeholder="Search pools, locations or sizes" handleSearch={handleSearch} />
        </Box>
        <Typography variant="body1" align="center" gutterBottom sx={{ mt: 2 }}>
          {`Results found: ${filteredPools.length || 0}`}
        </Typography>
        <div className="inner-padding">
          {filteredPools.reverse().map(article => (
            <div className="card-container" key={article._id}>
              <ArticleCard article={article} preventAnimation />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearcheablePools;
