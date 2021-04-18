/**
 * Author: Jesse Howell
 * 
 *   I declare that the following source code was written solely by me.
 *   I understand that copying any source code, in whole or in part,
 *   constitutes cheating, and that I will receive a zero on this
 *   project if I am found in violation of this policy.
 * 
 */

// open terminal, navigate to folder
//  g++ .\groceries.cpp
//  .\a.exe

#include <iostream>
#include <fstream>
#include <string>
#include <vector>

#include "split.h"

using std::string;

/**
 * ***FILES***
 *  customers.txt
 *      customer id, name, street, city, state, zip, phone, and email.
 *  items.txt
 *      item_id, description, and price
 *  orders.txt
 *      2 LINES PER ORDER
 *      customer id, order number, order date, variable-length list of item_id–quantity pairs
 *      payment code, payment information
 *          1 = credit card (card number and expiration date)
 *          2 = PayPal (paypal_id only)
 *          3 = wire transfer (bank_id and account_id)
 */

/*  Customer struct
 *  
 */
struct Customer {
    public:
        Customer(int new_cust_id, string new_name, string new_street, string new_city,
                 string new_state, string new_zip, string new_phone, string new_email) :
                 cust_id{new_cust_id}, name{new_name}, street{new_street}, city{new_city},
                 state{new_state}, zip{new_zip}, phone{new_phone}, email{new_email}{}
        string print_detail () const {
            /*  Customer ID #762212:
                Yolanda McAlarney, ph. 505-136-7715, email: ymcalarney2u@wordpress.com
                705 Corscot Hill
                Albuquerque, NM 87190 */
            return "Customer ID #" + std::to_string(cust_id) + ":\n" +
                name + ", ph. " + phone + ", email: " + email + "\n" +
                street + "\n" + city + ", " + state + " " + zip;
        }
        int getID() {
            return cust_id;
        }

    private:
        int cust_id;
        string name;
        string street;
        string city;
        string state;
        string zip;
        string phone;
        string email;
};

/*  LineItem class
 *  
 */
class LineItem {
    public:
        LineItem(int new_id, int new_qty) {
            item_id = new_id;
            qty = new_qty;
        }
        double sub_total() const {
            return 0;
        }
        friend bool operator<(const LineItem& item1, const LineItem& item2) {
            return item1.item_id < item2.item_id;
        }
        friend class Order;
    private:
        int item_id;
        int qty;
};

/*  Item struct
 *  
 */
struct Item {
    public:
        Item(int new_item_id, string new_description, double new_price) :
                 item_id{new_item_id}, description{new_description}, price{new_price}{}
        int getID() {
            return item_id;
        }
        string getDescription() {
            return description;
        }
        double getPrice() {
            return price;
        }
    private:
        int item_id;
        string description;
        double price;
};

/*  Payment class
 * 
 */
class Payment {
    public:
        virtual string print_detail() = 0;
        friend class Order;
    private:
        double amount;
};

/*  Credit class
 */
class Credit : public Payment {
    public:
        Credit(string new_card_num, string new_exp) {
            card_number = new_card_num;
            expiration = new_exp;
        }
        string print_detail() const {
            return "Paid by Credit card " + card_number + "3, exp. " + expiration;
        }
    private:
        string card_number;
        string expiration;
};

/*  PayPal class
 */
class PayPal : public Payment {
    public:
        PayPal(string new_id) {
            paypal_id = new_id;
        }
        string print_detail() const {
            return "Paid by Paypal ID: " + paypal_id;
        }
    private:
        string paypal_id;
};

/*  Credit class
 */
class WireTransfer : public Payment {
    public:
        WireTransfer(string new_bank_id, string new_account_id) {
            bank_id = new_bank_id;
            account_id = new_account_id;
        }
        string print_detail() const {
            return "Paid by Wire Transfer from Bank ID " + bank_id + ", Account# " + account_id;
        }
    private:
        string bank_id;
        string account_id;
};

/*  Order class
 *  All components of Order should be precomputed and passed to the
 *      Order constructor upon creation of the Order object. No setters.
 */
class Order {
    public:
        Order(int new_order_id, string new_order_date, int new_cust_id, std::vector<LineItem*> new_line_items, Payment new_payment*) {
            // we declare Order::payment as unique_ptr<Payment> payment;
            order_id = new_order_id;
            order_date = new_order_date;
            cust_id = new_cust_id;
            line_items = new_line_items;
            payment = new_payment;
        }
        //  computes the grand total for the order and sets the amount field in the Payment object directly.
        double total() {
            return 0;
        }
        string print_order() const {
            string items = "Order Detail:";
            for(int i = 0; i < line_items.size(); i++) {
                int item_id = line_items.at(i)->item_id;
                int item_index = find_item_idx(item_id);
                string item_name = items.at(item_index)->getDescription();
                double item_price = items.at(item_index)->getPrice();

                items += "\n\tItem " + item_id + ": \"" + item_name + "\", " + line_items.at(i)->qty + " @ " + item_price;
            }

            return "";
        }
    private:
        int order_id;
        string order_date;
        int cust_id;
        std::vector<LineItem*> line_items/* (0)/**/;
        Payment payment*;
};

std::vector<Customer*> customers (0);
std::vector<Item*> items (0);
std::vector<Order*> orders (0);

void read_customers(string filename) {
    // customer id, name, street, city, state, zip, phone, and email.
    std::cout << "DEBUG: Started read_customers() of groceries.cpp." << std::endl;
    std::ifstream file(filename);
    string str;
    while(std::getline(file, str)) {
        // 810003,Kai Antonikov,31 Prairie Rose Street,Philadelphia,PA,19196,215-975-7421,kantonikov0@4shared.com
        vector<string> pieces = split(str, ',');

        // When you add entries to a vector, use emplace_back instead of push_back so you don’t have to create a temporary object
        customers.push_back(new Customer(std::stoi(pieces.at(0)), pieces.at(1), pieces.at(2), pieces.at(3),
                                         pieces.at(4), pieces.at(5), pieces.at(6), pieces.at(7)));
    }
    std::cout << "DEBUG: size of customers is: " << customers.size() << ". First customer is:" << std::endl;
    // std::cout << customers.at(0)->print_detail() << std::endl;
}

void read_items(string filename) {
    std::cout << "DEBUG: Started read_items() of groceries.cpp." << std::endl;
    std::ifstream file(filename);
    string str;
    while(std::getline(file, str)) {
        vector<string> pieces = split(str, ',');

        items.push_back(new Item(std::stoi(pieces.at(0)), pieces.at(1), stod(pieces.at(2))));
    }
    std::cout << "DEBUG: size of items is: " << items.size() << std::endl;
}

void read_orders(string filename) {
    std::cout << "DEBUG: Started read_orders() of groceries.cpp." << std::endl;
    std::ifstream file(filename);
    string str1, str2;
    while(std::getline(file, str1) && std::getline(file, str2)) {
        vector<string> pieces1 = split(str1, ',');
        vector<string> pieces2 = split(str2, ',');
        // int order_id; string order_date; int cust_id; std::vector<LineItem*> line_items (0); Payment payment*;
        int cust_id = std::stoi(pieces1.at(0));
        int order_id = std::stoi(pieces1.at(1));
        string order_date = pieces1.at(2);

        std::vector<LineItem*> line_items (0);
        for(int i = 3; i < pieces1.size(); i++) {
            vector<int> item_pieces = split(pieces.at(i), '-');
            line_items.push_back(new LineItem(std::stoi(item_pieces.at(0)), std::stoi(item_pieces.at(1))));
        }

        Payment payment*;
        switch(pieces2.at(0)) {
            case '1': // credit card (card number and expiration date)
                payment = new Credit(pieces2.at(1), pieces2.at(2));
                break;
            case '2': // PayPal (paypal_id only)
                payment = new PayPal(pieces2.at(1));
                break;
            case '3': // wire transfer (bank_id and account_id)
                payment = new WireTransfer(pieces2.at(1), pieces2.at(2));
                break;
            default:
                std::cout << "ERROR: default reached in read_orders() switch statement" << std::endl;
        }
        // items.push_back(new Item(std::stoi(pieces.at(0)), pieces.at(1), stod(pieces.at(2))));
        std::sort(line_items.begin(), line_items.end());
        orders.push_back(new Order(order_id, order_date, cust_id, line_items, payment));
    }
}

int find_cust_idx(int cust_id) {
    int return_idx = -1;

    for(int i = 0; i < customers.size(); i++) {
        if(customers.at(i)->getID == cust_id) {
            return_idx = i;
            i = customers.size();
        }
    }

    return return_idx;
}

int find_item_idx(int item_id) {
    int return_idx = -1;

    for(int i = 0; i < items.size(); i++) {
        if(items.at(i)->getID == cust_id) {
            return_idx = i;
            i = items.size();
        }
    }

    return return_idx;
}

string dollarToString(double dollar) {
    string dollarStr = dollar.to_string();
    int decimal = dollarStr.find(".");
    if(decimal == string::npos) {
        dollarStr += ".00";
    } else {
        int missing = 2 - (dollarStr.size() - decimal);
        if(missing < 0) {
            dollarStr = dollarStr.substr(0, dollarStr.size() + missing);
        } else {
            for(int i = 0; i < missing; i++) {
                dollarStr += "0";
            }
        }
    }
}

int main() {
    std::cout << "Started main() of groceries.cpp." << std::endl;

    // read_customers("customers.txt");
    // read_items("items.txt");
    // read_orders("orders.txt");
    // for (const auto& order: orders)
    //     std::cout << order.print_order() << std::endl;
    std::cout << "dollarToString(243) becomes " << dollarToString(243) << std::endl;
    std::cout << "dollarToString(243.1) becomes " << dollarToString(243.1) << std::endl;
    std::cout << "dollarToString(243.19) becomes " << dollarToString(243.19) << std::endl;
    std::cout << "dollarToString(243.19763) becomes " << dollarToString(243.19763) << std::endl;
}