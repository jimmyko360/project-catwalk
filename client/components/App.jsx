import React from 'react';
import axios from 'axios';
import Overview from './Overview.jsx';
import RelatedProducts from './RelatedProducts.jsx';
import QnAs from './QnAs/QnAs.jsx';
import RatingsAndReviews from './ReviewsWidget.jsx';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      product: {
        id: null,
        name: '',
        slogan: '',
        description: '',
        category: '',
        default_price: '',
        features: [],
      },
      reviewMetaData: {
        product_id: null,
        ratings: {},
        recommended: {},
        characteristics: {},
      },
      reviewAverage: null,
      yourOutfit: [
      ],
    };
    this.addToOutfit = this.addToOutfit.bind(this);
  }

  componentDidMount() {
    let getProduct = axios.get('/api/fec2/hrnyc/products/11001');
    let getReviewMetaData = axios.get(
      '/api/fec2/hrnyc/reviews/meta?product_id=11001'
    );
    Promise.all([getProduct, getReviewMetaData])
      .then((results) => {
        let product = results[0].data;
        let reviewMetaData = results[1].data;
        let reviewAverage = this.reviewAverage(reviewMetaData.ratings);

        this.setState({
          product,
          reviewMetaData,
          reviewAverage,
        });
      })
      .catch((err) => console.error(err));
  }

  reviewAverage(ratings) {
    let totalStars = 0;
    let totalVotes = 0;
    for (let rating in ratings) {
      totalStars += parseInt(rating) * parseInt(ratings[rating]);
      totalVotes += parseInt(ratings[rating]);
    }
    return (totalStars / totalVotes).toFixed(1);
  }

  addToOutfit(event) {
    event.preventDefault();
    let outfitArray = this.state.yourOutfit;
    outfitArray.push(this.state.product);
    this.setState({ yourOutfit: outfitArray });
  }

  render() {
    return (
      <div>
        <div>HEADER FOR OUR WEBSITE</div>
        <br />
        <Overview
          product={this.state.product}
          reviewData={this.state.reviewData}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
        />
        <br />
        <RelatedProducts
          product={this.state.product}
          reviewData={this.state.reviewData}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
          addToOutfit={this.addToOutfit}
        />
        <br />
        <QnAs product={this.state.product} />
        <br />
        <RatingsAndReviews
          product={this.state.product}
          reviewData={this.state.reviewData}
          reviewMetaData={this.state.reviewMetaData}
          reviewAverage={this.state.reviewAverage}
          yourOutfit={this.state.yourOutfit}
        />
        <br />
      </div>
    );
  }
}

export default App;
