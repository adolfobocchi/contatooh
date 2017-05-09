/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('meusComponentes', [])
.directive('meuPainel', function() {
    var directive = {}
    directive.restrict = 'EA';
    directive.scope = {
        titulo: '@'
    };
    directive.transclude = true;
   /* directive.template =
'<div class="panel panel-default">' +
' <div class="panel-heading">' +
' <h3 class="panel-title">{{titulo}}</h3>' +
' </div>' +
' <div ng-transclude class="panel-body">' +
' </div>' +
'</div>';*/
    //SEPARANDO DDO
    directive.templateUrl = 'js/directives/meus-componentes/meu-painel.html';
    
return directive;
})
.directive('meuBotaoAviso', function() {
    var directive = {};
    directive.restrict = 'E';
    directive.scope = {
        nome: '@',
        acao: '&'
    };
    directive.template =
        '<button ng-click="acao()" class="btn btn-warning"> {{nome}} </buttom>';
    
return directive;
})
.directive('meuFocus', function() {
    var directive = {};
    directive.restrict = 'A';
    directive.scope = {
        evento: '@' 
    };
    directive.link = function(scope, element) {
        scope.$on(scope.evento, function() {
            element[0].focus();
        });
    };
    return directive;
});
