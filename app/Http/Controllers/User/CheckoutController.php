<?php

namespace App\Http\Controllers\User;

use App\Helper\Cart;
use App\Models\Order;
use App\Models\Payment;
use App\Models\CartItem;
use App\Models\OrderItem;
use App\Models\UserAddress;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class CheckoutController extends Controller
{
    public function index(){
        return view('user.checkout');
    }


    public function store(Request $request){
        $user = $request->user();
        $carts = $request->data['carts'];
        $products = $request->data['products'];
        $total = $request->data['total'];


        // loop through the "carts" array and merge with "products" data
        foreach($carts as $cartItem){
            foreach($products as $product){
                if($cartItem['product_id'] == $product['id']){
                    //merge the cart item with product data
                    $mergeData[] = array_merge($cartItem, ["title" => $product["title"], "price" => $product["price"]]);
                }
            }
        }

        // xử lý payment



        // thêm address nếu chưa có address main
        $newAddress =  $request->data['address'];
        if($newAddress['address'] != null){
            // nếu đã có địa chỉ 'isMain = 1' thì thêm địa chỉ 2 với 'isMain = 0'
            $address = UserAddress::where('isMain', 1)->count();
            if($address > 0){
                $address = UserAddress::where('isMain', 1)->update(['isMain' => 0]);
            }

            $address = new UserAddress();
            $address->address1 = $newAddress['address'];
            $address->address2 = '';
            $address->state = $newAddress['state'];
            $address->zipcode = $newAddress['zipcode'];
            $address->city = $newAddress['city'];
            $address->country_code = $newAddress['country_code'];
            $address->type = $newAddress['address_type'];
            $address->user_id = Auth::user()->id;
            $address->save();
        }

        $mainAddress = $user->user_address()->where('isMain', 1)->first();


        // nếu có main address thì tạo order
        if($mainAddress) {
            $order = new Order();
            $order->status = 'unpaid';
            $order->total_price = $total;
            // $order->session_id = $checkout_session->id;
            $order->session_id = 'session from payment';

            $order->created_by = $user->id;
            // If a main address with isMain = 1 exists, set its id as customer_address_id
            $order->user_address_id = $mainAddress->id;
            $order->save();



            $cartItems = CartItem::where(['user_id' => $user->id])->get();
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id, // Assuming you have an 'id' field in your orders table
                    'product_id' => $cartItem->product_id,
                    'quantity' => $cartItem->quantity,
                    // 'unit_price' => $cartItem->product->price,
                    'unit_price' => 0,

                ]);
                $cartItem->delete();
                //remove cart items from cookies
                $cartItems = Cart::getCookieCartItems();
                foreach ($cartItems as $item) {
                    unset($item);
                }
                array_splice($cartItems, 0, count($cartItems));
                Cart::setCookieCartItems($cartItems);
            }


            $paymentData = [
                'order_id' => $order->id,
                'amount' => $total,
                'status' => 'pending',
                'type' => 'stripe',
                'created_by' => $user->id,
                'updated_by' => $user->id,
                // 'session_id' => $session->id
            ];

            Payment::create($paymentData);
        }
        // return Inertia::location($checkout_session->url);
        dd('success');

    }

    public function success(Request $request){

    }



    public function cancel(){

    }
}
