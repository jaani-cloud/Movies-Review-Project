import { useState} from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        // full div screen...

        <div className="flex w-full h-screen overflow-hidden">

            {/* left side of screen... */}

            <div className="w-[50%] bg-white bg-gradient-to-br from-slate-900 to-slate-800">

                {/* In left side movie box */}

                <div className="relative flex items-center justify-center h-full">

                    {/* movie animation box */}

                    <div>
                        <img className="object-cover w-full h-[600px] rounded-2x relative max-w-md"
                        src="https://i.pinimg.com/1200x/1c/39/1a/1c391a10d6cc573da460758d31821602.jpg" alt="" />
                    </div>
                </div>
            </div>

            {/* right side of screen... */}

            <div className="w-[50%] bg-black flex items-center justify-center">
                
                {/* right login box */}
                <div className="">
                    <h1 className="mb-2 text-4xl font-bold text-white">Welcome Back!</h1>
                    <p className="mb-8 text-sm text-slate-400">Login to continue to review movies</p>
                    <input className="w-full p-3 mb-4 text-white border rounded-lg bg-slate-900 border-slate-700"
                     type="email" placeholder="Enter your email here..."
                     onChange={(e) => setEmail(e.target.value)} value={email}/>
                    <input className="w-full p-3 mb-4 text-white border rounded-lg bg-slate-900 border-slate-700"
                    type="password" placeholder="Enter your password here...."
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                    <button className="w-full py-3 mb-6 font-semibold text-white bg-blue-600 rounded-lg">Login</button>
                    <p className="text-sm text-center text-slate-400">Don't have an account? Signup</p>
                </div>
            </div>
        </div>
    );
}