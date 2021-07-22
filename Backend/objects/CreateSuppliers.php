<?php
// необходимые HTTP-заголовки 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json");

// подключение файла для соединения с базой и файл с объектом 
include_once '../config/database.php';
include_once '../objects/ObjectsO.php';

if($_SERVER['HTTP_REFERER']){
        $pieces = explode("/", $_SERVER['HTTP_REFERER']);
        if($pieces[2] != 'pamian.site'){
            http_response_code(200);
            echo json_encode('Неавторизированное обращение. В доступе отказано.');
            return;
        }
}
else{
        echo('Неавторизированное обращение. В доступе отказано.');
        return;
}

// получаем соединение с базой данных 
$database = new Database();
$db = $database->getConnection();

// подготовка объекта 
$Objects = new ObjectsO($db);

$SuppliersName = $_POST["SuppliersName"];
$SuppliersPhone = $_POST["SuppliersPhone"];
$SuppliersEmail = $_POST["SuppliersEmail"];
$SuppliersINN = $_POST["SuppliersINN"];
$SuppliersRasSchet = $_POST["SuppliersRasSchet"];
$SuppliersAdres = $_POST["SuppliersAdres"];
// прочитаем детали товара для редактирования

$stmt = $Objects->CreateSupplier($SuppliersName, $SuppliersPhone, $SuppliersEmail, $SuppliersINN, $SuppliersRasSchet, $SuppliersAdres);

$stmt = $Objects->ReadSuppliers();
$num = $stmt->rowCount();

if ($num>0) {

    // массив товаров 
    $products_arr=array();
    $products_arr["suppliers"]=array();

    // получаем содержимое нашей таблицы 
    // fetch() быстрее, чем fetchAll() 
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){

        // извлекаем строку 
        extract($row);
        
        $product_item=array(
            "suppliersID" => $suppliersID,
            "suppliersName" => $suppliersName,
            "suppliersPhone" => $suppliersPhone,
            "suppliersEmail" => $suppliersEmail,
            "suppliersINN" => $suppliersINN,
            "suppliersAdres" => $suppliersAdres,
            "suppliersRasSchet" => $suppliersRasSchet,
        );

        array_push($products_arr["suppliers"], $product_item);
    }
        // устанавливаем код ответа - 200 OK 
    http_response_code(200);

    // выводим данные о товаре в формате JSON 
    echo json_encode($products_arr);
}

else {
  // код ответа - 404 Не найдено 
    http_response_code(200);
    // сообщим пользователю, что товар не существует 
     echo json_encode(0);
}
?>