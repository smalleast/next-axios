(function () {

  var global = window || this;
  var nx = global.nx || require('next-js-core2');
  var axios = global.axios || require('axios');
  var Q = global.Q || require('q');

  var Axios = nx.declare('nxAxios', {
    methods: {
      axios: axios,
      init: function () {
        this.setDefaults();
        this.setHeaders();
        this.setRequestInterceptor();
        this.setResponseInterceptor();
      },
      setDefaults: function (inOptions) {
        var options = inOptions || {
          baseURL: './',
          timeout: 30000
        };
        nx.mix(axios.defaults, options);
      },
      setHeaders: function () {
        nx.mix(axios.defaults.headers.common, {
          'Content-Type': 'application/x-www-form-urlencoded'
        });
      },
      setRequestInterceptor: function () {
        var self = this;
        axios.interceptors.request.use(function (request) {
          return self.authorization(request);
        }, function (error) {
          return self.error(error);
        });
      },
      setResponseInterceptor: function () {
        var self = this;
        axios.interceptors.response.use(function (response) {
          return self.success(response);
        }, function (error) {
          return self.error(error);
        });
      },
      authorization: function (inRequest) {
        return inRequest;
      },
      success: function (inResponse) {
        return this.toData(inResponse);
      },
      error: function (inError) {
        console.log('[nx.Axios]: Please implment the method!', inError);
        return inError;
      },
      toData: function (inResponse) {
        return inResponse;
      },
      isSuccess: function (inResponse) {
        return !inResponse.errorCode;
      },
      all: function (inOptions) {
        return axios.all(inOptions);
      },
      post: function (inName, inData) {
        return axios.post(inName, inData);
      },
      get: function (inName, inData, inId) {
        if (typeof (inData) === "object") {
          var idStr = !!inId ? inName + '/' + inId : inName;
          return axios.get(idStr, {
            params: inData
          });
        } else {
          var axiosUrl = !!inData ? inName + '/' + inData : inName;
          return axios.get(axiosUrl);
        }

      },
      put: function (inName, inData, inId) {
        if (typeof (inData) === "object") {
          var idStr = !!inId ? inName + '/' + inId : inName;
          return axios.put(idStr, inData);
        } else {
          var axiosUrl = !!inData ? inName + '/' + inData : inName;
          return axios.put(axiosUrl);
        }

      },
      delete: function (inName, inData) {
        var axiosUrl = !!inData ? inName + '/' + inData : inName;
        return axios.delete(axiosUrl);
      }
    }
  });


  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Axios;
  }

}());
