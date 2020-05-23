export default class GooglePoly {

  constructor(apiKey) {
      this.apiKey = apiKey;
      this.currentResults = [];
      this.nextPageToken = "";
      this.keywords = "";
  }

  // Returns a query URL based on the given data...
  static getQueryURL(apiKey, keywords, nextPageToken) {
      var baseURL = "https://poly.googleapis.com/v1/assets?";

      var url = baseURL + "key=" + apiKey;
      url += "&pageSize=10";
      url += "&maxComplexity=MEDIUM";
      url += "&format=OBJ";
      if (keywords) { url += "&keywords=" + encodeURIComponent(keywords); }
      if (nextPageToken) { url += "&pageToken=" + nextPageToken; }
      return url;
  }

  // Sets current search parameters and resets member variables...
  setSearchParams = (keywords) => {
      this.currentResults = [];
      this.nextPageToken = "";
      this.keywords = keywords;
  }

  // Returns the results of the current query...
  getSearchResults() {
      var url = GooglePoly.getQueryURL(this.apiKey, this.keywords, this.nextPageToken);

      return fetch(url)
          .then(function(response) { return response.json(); })
          .then(function(data) {
              this.currentResults = this.currentResults.concat(data.assets);
              this.nextPageToken = data.nextPageToken;

              return Promise.resolve(data.assets);
          }.bind(this));
  }
}