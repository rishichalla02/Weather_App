import React, { useState } from 'react'
import Input from './components/Input'
import { Cards, CardContent } from './components/Cards'
import Button from './components/Button'
import { Sun, CloudRain, Snowflake, Cloud } from 'lucide-react'
import mySun from '../src/assets/sun.png'
import myCloud from '../src/assets/cloud.png'
import myRain from '../src/assets/rain.png'
import mySnow from '../src/assets/snow.png' 

const apiKey = import.meta.env.VITE_API_KEY;

const WeatherApp = () => {

    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('City not found');
            }
            const data = await response.json();
            setWeather(data);
        } catch (err) {
            setError(err.message);
            setWeather(null);
        }
        setLoading(false);
    }

    const getWeatherIcon = (main) => {
        switch (main) {
            case 'Clear':
                return <Sun className="w-8 h-8 text-yellow-500 flex items-center" />;
            case 'Rain':
                return <CloudRain className="w-8 h-8 text-blue-500" />;
            case 'Snow':
                return <Snowflake className="w-8 h-8 text-blue-900" />;
            case 'Clouds':
                return <Cloud className="w-8 h-8 text-gray-500" />;
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-200 to-blue-900 flex items-center justify-center p-4 overflow-hidden relative'>
            <style>
                {`
                @keyframes moveCloud { 
                    0% { 
                        transform: translateX(-100vw); 
                    }
                    100% { 
                        transform: translateX(calc(100vw + 200px)); 
                    }
                }
                
                .cloud-1 {
                    animation: moveCloud 15s ease-out infinite;
                }
                
                .cloud-2 {
                    animation: moveCloud 20s ease-out infinite;
                    animation-delay: -5s;
                }
                
                .cloud-3 {
                    animation: moveCloud 12s ease-out infinite;
                    animation-delay: -10s;
                }
                `}
            </style>
            {[...Array(3)].map((_, i) => (
                <div
                    key={i}
                    className={`absolute left-0 cloud-${i + 1}`}
                    style={{
                        top: `${i * 20 + 10}%`,
                        left: '-192px', // Start completely off-screen (cloud width is 192px)
                    }}
                >
                    <div className="w-48 h-16 bg-white rounded-full opacity-70 relative shadow-lg">
                        <div className="absolute top-[-30%] left-[25%] w-24 h-24 bg-white rounded-full"></div>
                        <div className="absolute top-[-40%] left-[60%] w-20 h-20 bg-white rounded-full"></div>
                    </div>
                </div>
            ))}
            <style>
                {`@keyframes float {0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); }}`}
            </style>
            <div className='absolute top-4 left-4'>
                <img
                    src={mySun}
                    alt="Weather Icon"
                    className="w-full h-32 object-contain rounded-full shadow-2xl border-1 border-blue-200"
                    style={{
                        animation: 'float 2s ease-in-out infinite',
                    }}
                />
            </div>
            <div className='absolute top-4 right-4'>
                <img
                    src={myRain}
                    alt="Weather Icon"
                    className="w-full h-32 bg-blue-400 object-contain rounded-full shadow-lg"
                    style={{
                        animation: 'float 2s ease-in-out infinite',
                    }}
                />
            </div>
            <div className='absolute bottom-4 left-4'>
                <img
                    src={myCloud}
                    alt="Weather Icon"
                    className="w-full h-32 bg-blue-400 object-contain rounded-full shadow-lg"
                    style={{
                        animation: 'float 2s ease-in-out infinite',
                    }}
                />
            </div>
            <div className='absolute bottom-4 right-4'>
                <img
                    src={mySnow}
                    alt="Weather Icon"
                    className="w-full h-32 bg-blue-400 object-contain rounded-full shadow-lg"
                    style={{
                        animation: 'float 2s ease-in-out infinite',
                    }}
                />
            </div>

            <Cards className='p-6 shadow-2xl rounded-2xl'>
                <CardContent>
                    <h1 className='text-3xl font-extrabold mb-4 p-6 shadow-2xl rounded-2xl'>Weather App <a href="http://localhost:5173/"><img src="icon.svg" className='w-12 cursor relative left-75 bottom-10' alt="icon" /></a> <span className='flex gap-9'><Sun className='text-yellow-400' /><CloudRain className='text-blue-800' /><Snowflake className='text-blue-300' /><Cloud className='text-gray-400' /></span></h1>
                    <div className='flex gap-2 mb-4'>
                        <Input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter City Name' className='flex-1 font-extrabold' />

                        <Button onClick={fetchWeather} disabled={loading}>
                            {
                                loading ? 'Loading' : 'Get Weather'
                            }
                        </Button>
                    </div>
                    {
                        weather && (
                            <div className='text-center mt-4 relative w-full top-10'>
                                {
                                    <div className='relative top-0 left-96 transform -translate-x-1/2'>
                                        {
                                            getWeatherIcon(weather.weather[0].main)
                                        }
                                    </div>
                                }
                                <h2 className='text-2xl font-bold mt-3'>{weather.name}, {weather.sys.country}</h2>
                                <p className='text-xl font-semibold mt-2 text-gray-700'>
                                    {weather.weather[0].main},
                                    {weather.weather[0].description}
                                </p>
                                <p className='text-4xl font-bold text-blue-400'>
                                    {Math.round(weather.main.temp)}°C
                                </p>
                            </div>
                        )
                    }
                </CardContent>
            </Cards>
        </div>
    )
}

export default WeatherApp