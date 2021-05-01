"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchShopServiceById = fetchShopServiceById;
exports.saveServiceRequestToDb = saveServiceRequestToDb;
exports.getUserServiceRequests = getUserServiceRequests;
exports.fetchData = fetchData;
exports.updateServiceRequests = updateServiceRequests;
exports.updateDeleteData = updateDeleteData;
exports.retrieveUserData = retrieveUserData;
exports.getCookie = void 0;

var getCookie = function getCookie(name) {
  var cookieValue = null;

  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim(); // Does this cookie string begin with the name we want?

      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }

  return cookieValue;
};

exports.getCookie = getCookie;
var csrftoken = getCookie('csrftoken');

function fetchShopServiceById(id) {
  var requestOptions, response, service;
  return regeneratorRuntime.async(function fetchShopServiceById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            } // body: JSON.stringify({shop_id:12})

          };
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:9000/api/shop-service/".concat(id), requestOptions));

        case 3:
          response = _context.sent;

          if (response.ok) {
            _context.next = 6;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          service = _context.sent;
          return _context.abrupt("return", service);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
}

function saveServiceRequestToDb(request) {
  var csrftoken, requestOptions, response, responseMessage;
  return regeneratorRuntime.async(function saveServiceRequestToDb$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          csrftoken = getCookie('csrftoken');
          requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(request)
          };
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:9000/api/service-request/", requestOptions));

        case 4:
          response = _context2.sent;

          if (response.ok) {
            _context2.next = 7;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          responseMessage = _context2.sent;
          return _context2.abrupt("return", responseMessage);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  });
} // customer/requests


function getUserServiceRequests() {
  var requestOptions, response, res;
  return regeneratorRuntime.async(function getUserServiceRequests$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            } // body: JSON.stringify(request)

          };
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:9000/api/customer/requests/", requestOptions));

        case 3:
          response = _context3.sent;

          if (response.ok) {
            _context3.next = 6;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 6:
          _context3.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          res = _context3.sent;
          return _context3.abrupt("return", res);

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function updateServiceRequests(services, status) {
  var requestOptions, response, res;
  return regeneratorRuntime.async(function updateServiceRequests$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
              ids: services,
              status: status
            })
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:9000/api/service-request/update/", requestOptions));

        case 3:
          response = _context4.sent;

          if (response.ok) {
            _context4.next = 6;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          res = _context4.sent;
          return _context4.abrupt("return", res);

        case 10:
        case "end":
          return _context4.stop();
      }
    }
  });
} //generic data fetching function


function fetchData(endpoint) {
  var requestOptions, response, res;
  return regeneratorRuntime.async(function fetchData$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            } // body: JSON.stringify(request)

          };
          _context5.next = 3;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:9000/api".concat(endpoint), requestOptions));

        case 3:
          response = _context5.sent;

          if (response.ok) {
            _context5.next = 6;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          res = _context5.sent;
          return _context5.abrupt("return", res);

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
} //generic data updating/deleting function


function updateDeleteData(endpoint) {
  var method,
      requestOptions,
      response,
      res,
      _args6 = arguments;
  return regeneratorRuntime.async(function updateDeleteData$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          method = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : "DELETE";
          requestOptions = {
            method: method,
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrftoken
            } // body: JSON.stringify(request)

          };
          _context6.next = 4;
          return regeneratorRuntime.awrap(fetch("http://127.0.0.1:9000/api".concat(endpoint), requestOptions));

        case 4:
          response = _context6.sent;

          if (response.ok) {
            _context6.next = 7;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          res = _context6.sent;
          return _context6.abrupt("return", res);

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function retrieveUserData() {
  var requestOptions, response, res;
  return regeneratorRuntime.async(function retrieveUserData$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log('retrieving data');
          requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify()
          };
          _context7.next = 4;
          return regeneratorRuntime.awrap(fetch('http://127.0.0.1:9000/api/check_auth', requestOptions));

        case 4:
          response = _context7.sent;

          if (response.ok) {
            _context7.next = 7;
            break;
          }

          throw new Error("HTTP status " + response.status);

        case 7:
          _context7.next = 9;
          return regeneratorRuntime.awrap(response.json());

        case 9:
          res = _context7.sent;
          return _context7.abrupt("return", res);

        case 11:
        case "end":
          return _context7.stop();
      }
    }
  });
}