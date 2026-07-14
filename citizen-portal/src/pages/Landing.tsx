import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Building2, GraduationCap, Building, ChevronRight, Fingerprint, ScanFace, Globe } from 'lucide-react';
import logo from '../assets/logo.svg';
import networkBg from '../assets/network-bg.svg';

export const Landing = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="h-20 border-b border-gray-200 flex items-center justify-between px-6 lg:px-12 bg-white/95 backdrop-blur-sm sticky top-0 z-50">
                <div className="flex items-center">
                    <img src={logo} alt="Aether Logo" className="h-10 w-auto mr-3" />
                    <span className="font-bold text-2xl text-[#0A1628] tracking-tight">Aether</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/login" className="text-sm font-medium text-[#1A1A2E] hover:text-[#1B3A5C] transition-colors">
                        Sign In
                    </Link>
                    <Link to="/register">
                        <Button variant="primary">Get Verified</Button>
                    </Link>
                </div>
            </header>

            <section
                className="relative flex items-center justify-center min-h-[90vh] px-6"
                style={{
                    backgroundImage: `url(${networkBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            >
                <div className="relative z-10 max-w-4xl mx-auto text-center py-20">
                    <div className="inline-flex items-center rounded-full border border-[#D4A843]/30 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-[#D4A843] mb-8">
                        <ShieldCheck className="mr-2 h-4 w-4" /> Secure Identity Verification for Zimbabwe
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                        Your Identity.<br />
                        <span className="text-[#D4A843]">Verified Once.</span><br />
                        Trusted Everywhere.
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Aether provides government-grade digital identity verification. Verify your identity once and securely prove who you are to banks, universities, employers, and government services across Zimbabwe.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/register">
                            <button className="bg-[#D4A843] hover:bg-[#C09A35] text-[#0A1628] font-semibold px-8 py-4 rounded-lg text-lg transition-all shadow-lg flex items-center justify-center min-w-[220px]">
                                Get Verified <ChevronRight className="ml-2 h-5 w-5" />
                            </button>
                        </Link>
                        <Link to="http://localhost:5175/login">
                            <button className="border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-4 rounded-lg text-lg transition-all min-w-[220px]">
                                Organization Login
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <p className="text-sm font-semibold text-[#D4A843] uppercase tracking-widest text-center mb-3">How It Works</p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0A1628] text-center mb-12">Identity Intelligence, Simplified</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-[#F4F6F9] border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#D4A843]/10 rounded-lg flex items-center justify-center mb-5">
                                <ScanFace className="h-7 w-7 text-[#D4A843]" />
                            </div>
                            <h3 className="font-bold text-xl text-[#0A1628] mb-3">AI Face Matching</h3>
                            <p className="text-[#1A1A2E]/70 leading-relaxed">Advanced biometric verification using passive liveness detection and face matching — no spoofing, no fraud.</p>
                        </div>
                        <div className="bg-[#F4F6F9] border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#D4A843]/10 rounded-lg flex items-center justify-center mb-5">
                                <Fingerprint className="h-7 w-7 text-[#D4A843]" />
                            </div>
                            <h3 className="font-bold text-xl text-[#0A1628] mb-3">Document Verification</h3>
                            <p className="text-[#1A1A2E]/70 leading-relaxed">Upload your Zimbabwe National ID or Passport. Our AI validates authenticity and extracts data in seconds.</p>
                        </div>
                        <div className="bg-[#F4F6F9] border border-gray-100 rounded-xl p-8 hover:shadow-lg transition-shadow">
                            <div className="w-14 h-14 bg-[#D4A843]/10 rounded-lg flex items-center justify-center mb-5">
                                <Globe className="h-7 w-7 text-[#D4A843]" />
                            </div>
                            <h3 className="font-bold text-xl text-[#0A1628] mb-3">Portable Credentials</h3>
                            <p className="text-[#1A1A2E]/70 leading-relaxed">Your verified identity travels with you. Share QR-verifiable digital credentials with any institution.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#0A1628] text-white py-14 px-6">
                <div className="max-w-5xl mx-auto">
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-widest text-center mb-8">Built for Zimbabwe's Institutions</p>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16">
                        <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                            <Building className="mr-3 h-6 w-6 text-[#D4A843]" />
                            <span className="font-semibold text-lg">Government Agencies</span>
                        </div>
                        <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                            <Building2 className="mr-3 h-6 w-6 text-[#D4A843]" />
                            <span className="font-semibold text-lg">Commercial Banks</span>
                        </div>
                        <div className="flex items-center text-gray-300 hover:text-white transition-colors">
                            <GraduationCap className="mr-3 h-6 w-6 text-[#D4A843]" />
                            <span className="font-semibold text-lg">Universities</span>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="bg-[#0A1628] border-t border-gray-700 py-8 px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center mb-3 md:mb-0">
                        <img src={logo} alt="Aether" className="h-6 w-auto mr-2 opacity-60" />
                        <span>© 2026 Aether Labs. All rights reserved.</span>
                    </div>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};