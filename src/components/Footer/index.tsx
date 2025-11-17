"use client"
import Link from "next/link";
import { Phone, Mail, MessageCircle, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

export default function Footer() {

    const images = [
        "/footer/apple_pay_mini.png",
        "/footer/cod_mini.png",
        "/footer/credit_card_mini.png",
        "/footer/mada_mini.png",
        "/footer/madfu_installment_mini.png",
        "/footer/sbc.png",
        "/footer/stc_pay_mini.png",
        "/footer/tabby_installment_mini.png",
        "/footer/tamara_installment_mini.png",
        "/footer/tax.png"
    ]

    return (
        <div className="bg-black text-white">
            <div className="container px-6 md:px-20 ">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-16">
                    <div>
                        <Image
                            src="/VT6ZK4mbEyEgl60m71k0fDdWZ6SW5VKEbkNDAhwM.png"
                            alt="footer"
                            height={100}
                            width={150}
                            className="object-cover"

                        />
                        <p>Either greatness, or nothing.
                            value added tax
                            VAT Account Number : 302159873900003</p>
                    </div>
                    {/* My Account */}
                    <div>
                        <h1 className="text-2xl font-bold">My Account</h1>
                        <ul className="flex flex-col py-5 space-y-2">
                            <Link href="/" className="hover:text-gray-400">Notifcations</Link>
                            <Link href="/" className="hover:text-gray-400">Orders</Link>
                            <Link href="/" className="hover:text-gray-400">Pending Payments</Link>
                            <Link href="/" className="hover:text-gray-400">Wishlist</Link>
                            <Link href="/" className="hover:text-gray-400">My Account</Link>
                            <Link href="/" className="hover:text-gray-400">Loyalty Points</Link>
                            <Link href="/" className="hover:text-gray-400">Logout</Link>
                        </ul>
                    </div>
                    {/* Important Links */}
                    <div>
                        <h1 className="text-2xl font-bold">Important Links</h1>
                        <div className="flex gap-10 py-5">
                            <div className="flex flex-col space-y-2">
                                <Link href="/" className="hover:text-gray-400">Who We Are</Link>
                                <Link href="/" className="hover:text-gray-400">معلومات الشحن</Link>
                                <Link href="/" className="hover:text-gray-400">Privacy Policy</Link>
                                <Link href="/" className="hover:text-gray-400">For Complaints</Link>
                            </div>
                            <div className="flex flex-col space-y-2">
                                <Link href="/" className="hover:text-gray-400">Franchise Applications</Link>
                                <Link href="/" className="hover:text-gray-400">Discover Your Taste</Link>
                                <Link href="/" className="hover:text-gray-400">Return Information</Link>
                            </div>
                        </div>
                    </div>
                    {/* Contact Us */}
                    <div>
                        <h1 className="text-2xl font-bold">Contact Us</h1>
                        <ul className="flex flex-col space-y-3 py-5">
                            <Link href="tel:9889892" className="flex items-center gap-2 hover:text-gray-400">
                                <Phone className="w-4 h-4" /> 9889892
                            </Link>
                            <Link href="https://wa.me/201234567890" target="_blank" className="flex items-center gap-2 hover:text-gray-400">
                                <MessageCircle className="w-4 h-4" /> WhatsApp
                            </Link>
                            <Link href="mailto:info@example.com" className="flex items-center gap-2 hover:text-gray-400">
                                <Mail className="w-4 h-4" /> ايميل
                            </Link>
                        </ul>
                    </div>

                </div>
                <div className="w-full border-t border-dotted border-gray-500"></div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-5 border-t border-gray-700">

                    {/* حقوق النشر */}
                    <h3 className="text-gray-400 text-sm text-center md:text-left">
                        Copyright © 2025 ASSAF
                    </h3>

                    {/* صور وسائل الدفع */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {images.map((src, index) => (
                            <div key={index} className="relative w-12 h-8">
                                <Image
                                    src={src}
                                    alt={`وسيلة دفع ${index + 1}`}
                                    fill
                                    className="object-contain p-1 bg-white border rounded-sm"
                                />
                            </div>
                        ))}
                    </div>

                    {/* أيقونات السوشيال */}
                    <div className="flex items-center gap-3">
                        <Link href="/" className="p-2 border border-gray-600 rounded-md hover:bg-gray-700">
                            <Facebook className="w-4 h-4" />
                        </Link>
                        <Link href="/" className="p-2 border border-gray-600 rounded-md hover:bg-gray-700">
                            <Twitter className="w-4 h-4" />
                        </Link>
                        <Link href="/" className="p-2 border border-gray-600 rounded-md hover:bg-gray-700">
                            <Instagram className="w-4 h-4" />
                        </Link>
                        <Link href="/" className="p-2 border border-gray-600 rounded-md hover:bg-gray-700">
                            <Youtube className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
