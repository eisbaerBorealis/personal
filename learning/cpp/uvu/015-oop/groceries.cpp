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

#include <algorithm>
#include <iostream>
#include <fstream>
#include <string>
#include <vector>

#include "split.h"

using std::string;

int find_item_idx(int item_id);
int find_cust_idx(int cust_id);
string dollarToString(double dollar);

struct Customer {
    public:
        Customer(int new_cust_id, string new_name, string new_street, string new_city,
                 string new_state, string new_zip, string new_phone, string new_email) :
                 cust_id{new_cust_id}, name{new_name}, street{new_street}, city{new_city},
                 state{new_state}, zip{new_zip}, phone{new_phone}, email{new_email}{}
        string print_detail () const {
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

std::vector<Customer*> customers (0);

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

std::vector<Item*> items (0);

class LineItem {
    public:
        LineItem(int new_id, int new_qty) {
            item_id = new_id;
            qty = new_qty;
        }
        double sub_total() const {
            int item_index = find_item_idx(item_id);
            double item_price = items.at(item_index)->getPrice();

            return qty * item_price;
        }
        int getID() {
            return item_id;
        }
        friend bool operator<(const LineItem& item1, const LineItem& item2) {
            return item1.item_id < item2.item_id;
        }
        friend class Order;
    private:
        int item_id;
        int qty;
};

class Payment {
    public:
        virtual string print_detail() const = 0;
        friend class Order;
    private:
        double amount;
};

class Credit : public Payment {
    public:
        Credit(string new_card_num, string new_exp) {
            card_number = new_card_num;
            expiration = new_exp;
        }
        string print_detail() const {
            return "Paid by Credit card " + card_number + ", exp. " + expiration;
        }
    private:
        string card_number;
        string expiration;
};

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

class WireTransfer : public Payment {
    public:
        WireTransfer(string new_bank_id, string new_account_id) {
            bank_id = new_bank_id;
            account_id = new_account_id;
        }
        string print_detail() const {
            return "Paid by Wire transfer from Bank ID " + bank_id + ", Account# " + account_id;
        }
    private:
        string bank_id;
        string account_id;
};

class Order {
    public:
        Order(int new_order_id, string new_order_date, int new_cust_id, std::vector<LineItem> new_line_items, Payment* new_payment) {
            order_id = new_order_id;
            order_date = new_order_date;
            cust_id = new_cust_id;
            line_items = new_line_items;
            payment = new_payment;
        }
        double total() const {
            double return_total = 0;
            for(int i = 0; i < line_items.size(); i++) {
                return_total += line_items.at(i).sub_total();
            }
            return return_total;
        }
        string print_order() const {
            string itemsStr = "Order Detail:";
            for(int i = 0; i < line_items.size(); i++) {
                int item_id = line_items.at(i).item_id;
                int item_index = find_item_idx(item_id);
                string item_name = items.at(item_index)->getDescription();
                double item_price = items.at(item_index)->getPrice();

                itemsStr += "\n    Item " + std::to_string(item_id) + ": \"" + item_name + "\", " + std::to_string(line_items.at(i).qty) + " @ " + dollarToString(item_price);
            }
            itemsStr += "\n";
            
            int cust_index = find_cust_idx(cust_id);
            string cust_string = customers.at(cust_index)->print_detail();

            std::stringstream ss;
            ss << "===========================" <<
                   "\nOrder #" << std::to_string(order_id) << ", Date: " << order_date <<
                   "\nAmount: $" << dollarToString(total()) << ", " << payment->print_detail() <<
                   "\n" << cust_string << // this is four lines long
                   "\n" << itemsStr;

            return ss.str();
        }
    private:
        int order_id;
        string order_date;
        int cust_id;
        std::vector<LineItem> line_items;
        Payment* payment;
};

std::vector<Order*> orders (0);

void read_customers(string filename) {
    std::ifstream file(filename);
    string str;
    while(std::getline(file, str)) {
        vector<string> pieces = split(str, ',');

        customers.push_back(new Customer(std::stoi(pieces.at(0)), pieces.at(1), pieces.at(2), pieces.at(3),
                                         pieces.at(4), pieces.at(5), pieces.at(6), pieces.at(7)));
    }
}

void read_items(string filename) {
    std::ifstream file(filename);
    string str;
    while(std::getline(file, str)) {
        vector<string> pieces = split(str, ',');

        items.push_back(new Item(std::stoi(pieces.at(0)), pieces.at(1), stod(pieces.at(2))));
    }
}

void read_orders(string filename) {
    std::ifstream file(filename);
    string str1, str2;
    while(std::getline(file, str1) && std::getline(file, str2)) {
        vector<string> pieces1 = split(str1, ',');
        vector<string> pieces2 = split(str2, ',');
        int cust_id = std::stoi(pieces1.at(0));
        int order_id = std::stoi(pieces1.at(1));
        string order_date = pieces1.at(2);

        std::vector<LineItem> line_items;
        for(int i = 3; i < pieces1.size(); i++) {
            vector<string> item_pieces = split(pieces1.at(i), '-');
            line_items.push_back(LineItem(std::stoi(item_pieces.at(0)), std::stoi(item_pieces.at(1))));
        }

        Payment* payment;
        switch(pieces2.at(0).at(0)) {
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
        std::sort(line_items.begin(), line_items.end());

        orders.push_back(new Order(order_id, order_date, cust_id, line_items, payment));
    }
}

int find_cust_idx(int cust_id) {
    int return_idx = -1;

    for(int i = 0; i < customers.size(); i++) {
        if(customers.at(i)->getID() == cust_id) {
            return_idx = i;
            i = customers.size();
        }
    }

    return return_idx;
}

int find_item_idx(int item_id) {
    int return_idx = -1;

    for(int i = 0; i < items.size(); i++) {
        if(items.at(i)->getID() == item_id) {
            return_idx = i;
            i = items.size();
        }
    }

    return return_idx;
}

string dollarToString(double dollar) {
    string dollarStr = std::to_string(dollar);
    int decimal = dollarStr.find(".");
    if(decimal == string::npos) {
        dollarStr += ".00";
    } else {
        int missing = 3 - (dollarStr.size() - decimal);
        if(missing < 0) {
            dollarStr = std::to_string(dollar + 0.005);
            dollarStr = dollarStr.substr(0, dollarStr.size() + missing);
        } else {
            for(int i = 0; i < missing; i++) {
                dollarStr += "0";
            }
        }
    }
    return dollarStr;
}

int main() {
    read_customers("customers.txt");
    read_items("items.txt");
    read_orders("orders.txt");

    remove("order_report.txt");
    std::ofstream Report("order_report.txt");

    for (const auto& order: orders)
        // std::cout << order->print_order() << std::endl;
        Report <<  order->print_order();
    Report.close();
}