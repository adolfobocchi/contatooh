/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('contatooh').factory('Pesquisa', function($resource) {
        return $resource('/pesquisas/:id');
}).factory('Socket', function($rootScope) {  
    var socket = io.connect();
    return {
        on: function (eventName, callback) {
             console.log("service socket on");
            socket.on(eventName, function () {
                console.log("service socket function on");
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            console.log("service socket emit");
            socket.emit(eventName, data, function () {
                console.log("service socket function emit");
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

