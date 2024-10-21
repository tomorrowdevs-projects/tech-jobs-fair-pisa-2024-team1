import React, { useState } from 'react';
import axios from 'axios';
import { IoIosSearch } from 'react-icons/io';
import { Place } from '../pages/MapPage';

interface SearchInputProps {
    setLocation: (value: Place) => void
}

const SearchInput = ({ setLocation }: SearchInputProps) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<Place[]>([]);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const searchPlaces = async (searchQuery: string) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: searchQuery,
                    format: 'json',
                    addressdetails: 1,
                    limit: 5,
                },
            });
            setResults(response.data);
            setShowSuggestions(true);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length > 2) {
            searchPlaces(value);
        } else {
            setShowSuggestions(false);
        }
    };

    const handleSelect = (place: Place) => {
        setQuery(place.display_name as string);
        setLocation(place)
        setShowSuggestions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && results.length > 0) {
            handleSelect(results[0]);
        }
    };

    return (
        <div className="relative w-full max-w-md mx-auto">
            <input
                type="text"
                className="w-full rounded-full p-4 box-shadow placeholder:italic font-medium outline-none"
                placeholder="Search location..."
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
            />
            <button className="absolute top-[11px] right-5">
                <IoIosSearch color="#878585" size={35} />
            </button>
            {showSuggestions && results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1">
                    {results.map((place, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(place)}
                        >
                            {place.display_name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
