var email_ips = "contacto@saludsion.com.co";

var app = angular.module('solicitudCita', []);

app.controller('SolicitudCitaController', ['$scope','$http','$location',function($scope, $http, $location) {
   initCita();

   $scope.solicitarCita = function(){
      if($scope.formCita.$valid){
        console.log($scope.cita);
        $scope.cita.email_ips = email_ips;
        $scope.cita.fecha_fmt = moment($scope.cita.fecha).format('DD/MM/YYYY');

        $http({
          url: "https://saludsion.com.co/mail.php", 
          method: "POST", 
          data: $scope.cita
        }).success(function(data, status) {
            limpiarCita();
            window.location.href = 'exito.htm';
        }).error(function(data) {
               console.log('Error:' + data);
         });
      }
   };

   function initCita(){
      $http.get('js/servicios.json')
       .then(function(res){
          $scope.servicios = res.data;               
      });

      $http.get('js/aseguradoras.json')
       .then(function(res){
          $scope.aseguradoras = res.data;               
      });
      limpiarCita();
   }
   
   function limpiarCita(){
      $scope.cita = {};
      $scope.cita.servicio = "";
      $scope.cita.aseguradora = "";
      $scope.cita.fechaActual = new Date();
      $scope.cita.fecha = $scope.cita.fechaActual;
   };

}]);

