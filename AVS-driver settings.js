// Unit: Commands
var g_driver_name = "Multiport 1";
var g_avs_driver = IR.GetDevice(g_driver_name);
var g_phy_address = 6233;

var readFeedbacksWhenConnected = false;
var timeDelayForReadRequests = 2000;// ms, min 200ms


g_Commands = [

    Command("MyCommand 1" , DPT1, 1),
    Command("MyCommand 2" , DPT2, 2),
    Command("MyCommand 3" , DPT3, 3),
    Command("MyCommand 4" , DPT4, 4),
    Command("MyCommand 5" , DPT5, 5),
    Command("MyCommand 6" , DPT6, 6),
    Command("MyCommand 7" , DPT7, 7),
    Command("MyCommand 8" , DPT8, 8),
    Command("MyCommand 9" , DPT9, 9),
    Command("MyCommand 10" , DPT10, 10),
    Command("MyCommand 11" , DPT11, 11)
    
];


g_Feedbacks = [

    Feedback("MyFeedback 1" , DPT1, 1),
    Feedback("MyFeedback 2" , DPT2, 2),
    Feedback("MyFeedback 3" , DPT3, 3),
    Feedback("MyFeedback 4" , DPT4, 4),
    Feedback("MyFeedback 5" , DPT5, 5),
    Feedback("MyFeedback 6" , DPT6, 6),
    Feedback("MyFeedback 7" , DPT7, 7),
    Feedback("MyFeedback 8" , DPT8, 8),
    Feedback("MyFeedback 9" , DPT9, 9),
    Feedback("MyFeedback 10" , DPT10, 10),
    Feedback("MyFeedback 11" , DPT11, 11)
    
];

g_drivers = [
    "basement Multiport mini",
    "basement Multiport 2 (31)",       
    "basement Multiport 3 (32)"   
];