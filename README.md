# Iridium server JS driver for AVS-control controllers 

используется TCP транспорт

## Как добавить драйвер:

1. создайте проект Iridium server (.sirpz)
2. создайте три файла со скриптами в проект
3. убедитесь, что файлы скриптов стоят в правльном порядке - сверху вниз: AVS-commands.js, AVS-driver.js, AVS-driver.js.

![ScreenShot](https://github.com/Vladimir2014RK122/AVS-driver-Iridium/blob/main/img/scripts.png)


## Настройка драйвера:

1. Создайте драйвер "AV & Custom systems";
2. Выберите протокол "TCP";
3. Установите "Host" : IP адрес контроллера, который будет использоваться в качестве шлюза.(Multiport поддерживает только одно активное подключение);
4. Установите "Port" : 7677;
5. Установите "Mode" : "Always connected";
6. Установите "Script mode" : "Script only";
7. Остальное оставьте без изменений.

![ScreenShot](https://github.com/Vladimir2014RK122/AVS-driver-Iridium/blob/main/img/driver.png)




## Создание адресов и статусов:<br>

Создайте адреса и статусы:<br>



![ScreenShot](https://github.com/Vladimir2014RK122/AVS-driver-Iridium/blob/main/img/commands.png)


## Настройка скриптовой части драйвера:<br>

*  в файле `AVS-driver settings.js` вписать настройки оборудования:<br>

		var g_phy_address = 6233;
		var readFeedbacksWhenConnected = false;
		var timeDelayForReadRequests = 2000;// ms, min 200ms

		g_drivers = [
		    "My multiport device 1",
		    "My multiport device 2",       
		    "My multiport device 3"   
		];

> **g\_phy\_address** : *Number*<br>
> физический адрес сервера, будет отображаться в телеграммах, отправляемых с Iridium server.

> **readFeedbacksWhenConnected** : *Boolean*<br>
> отправлять запросы чтения всех статусов при изменении состояния подключения драйвера(из offline в online).

> **timeDelayForReadRequests** : *Boolean*<br>
> задержка между запросами чтения статусов, в миллисекундах. Не рекомендуется устанавливать значение менее 300 т.к. возможны потери.

> **g\_drivers** : *string*<br>
> имена драйверов, должны совпадать с именами драйверов в дереве устройств проекта.


Далее нужно создать адреса и статусы:<br>
  
	g_Commands = [

    	Command("command 1" , DPT1, 1),
    	Command("command 2" , DPT2, 2),
    	Command("command 3" , DPT3, 3),
    	Command("command 4" , DPT4, 4),
    	Command("command 5" , DPT5, 5),
    	Command("command 6" , DPT6, 6),
    	Command("command 7" , DPT7, 7),
    	Command("command 8" , DPT8, 8),
    	Command("command 9" , DPT9, 9),
    	Command("command 10" , DPT10, 10),
    	Command("command 11" , DPT11, 11)
    
	];


	g_Feedbacks = [

    	Feedback("feedback 1" , DPT1, 1),
    	Feedback("feedback 2" , DPT2, 2),
    	Feedback("feedback 3" , DPT3, 3),
    	Feedback("feedback 4" , DPT4, 4),
    	Feedback("feedback 5" , DPT5, 5),
    	Feedback("feedback 6" , DPT6, 6),
    	Feedback("feedback 7" , DPT7, 7),
    	Feedback("feedback 8" , DPT8, 8),
    	Feedback("feedback 9" , DPT9, 9),
    	Feedback("feedback 10" , DPT10, 10),
    	Feedback("feedback 11" , DPT11, 11)
    
	];
	
> **Command(name: String , dpt:Number, address:Number)** : *Object*<br>
> **name** - имя команды, должно соответствовать имени команды в дереве драйверов.<br>
> **dpt** - тип команды(DPT1...DPT11).<br>
> **address** - адрес команды.<br>

> **Feedback(name: String , dpt:Number, address:Number)** : *Object*<br>
> **name** - имя статуса, должно соответствовать имени статуса в дереве драйверов.<br>
> **dpt** - тип статуса(DPT1...DPT11).<br>
> **address** - адрес статуса.<br>

Возвращают объект: 

	{"name":name, "dpt":dpt, "address":address}


## Использование в скриптах:<br>

Для отправки команд из скриптов можно пользоваться следующими функциями:

	var array = sendData(WRITE, g_Commands[0].address, g_Commands[0].dpt, value);
	IR.GetDevice(g_driver_name).Send(array);
       
> **sendData(telType: Number, address:Number, dpt: Number, value:Number)** : *Object*<br>
> **telType** - тип отправляемой телеграммы (WRITE = 1/READ = 2).<br>
> **address** - адрес телеграммы.<br>   
> **dpt** - тип статуса(DPT1...DPT11).<br>
> **value** - отправляемое значение.<br>    

Возвращает массив, подготовленный к отправке оборудованию. 
            