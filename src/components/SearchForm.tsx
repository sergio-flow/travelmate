
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFormProps {
  onSearch: (searchParams: any) => void;
}

const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [origin, setOrigin] = useState("");
  const [participants, setParticipants] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      origin,
      participants,
    });
  };

  return (
    <div className="glass-card p-4 md:p-6">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger className="glass-input h-12">
              <SelectValue placeholder="Origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bucharest">Bucharest</SelectItem>
              <SelectItem value="chisinau">Chisinau</SelectItem>
              <SelectItem value="cluj-napoca">Cluj-Napoca</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select value={participants} onValueChange={setParticipants}>
            <SelectTrigger className="glass-input h-12">
              <SelectValue placeholder="Participants" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo</SelectItem>
              <SelectItem value="me-and-friends">Me and friends</SelectItem>
              <SelectItem value="me-and-lover">Me and lover</SelectItem>
              <SelectItem value="3+">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <button type="submit" className="search-button h-12 px-8">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchForm;
