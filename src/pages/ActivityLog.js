import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axios from "axios";

// Define API URL
const API_URL = "http://127.0.0.1:5050/api/v1/log/getAllLogs";

export default function ActivityLog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to extract domain name
  const getDomainName = (url) => {
    try {
      const hostname = new URL(url).hostname; // Get the hostname
      const parts = hostname.split("."); // Split by dots
      return parts.length > 1 ? parts[parts.length - 2] : hostname;
    } catch (err) {
      console.error("Invalid URL:", url);
      return url; // Fallback to full URL if parsing fails
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        console.log(response.data);
        setData(response.data.data.log || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={4}>
        <Spinner size="xl" />
        <Box mt={2}>Loading data...</Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </Box>
    );
  }

  if (data.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Alert status="info">
          <AlertIcon />
          <AlertTitle>No Data Available</AlertTitle>
        </Alert>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Table variant="striped" width="100%">
        <Thead>
          <Tr>
            <Th>No</Th>
            <Th>Link</Th>
            <Th>Censor Status</Th>
            <Th>User</Th>
            <Th>Time Stamp</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row, index) => (
            <Tr key={row._id}>
              <Td>{index + 1}</Td>
              <Td>
                <a href={row.url} target="_blank" rel="noopener noreferrer">
                  {row.url.length > 60 ? getDomainName(row.url) : row.url}
                </a>
              </Td>
              <Td>{row.censorStatus}</Td>
              <Td>{row.username}</Td>
              <Td>{new Date(row.timestamp).toLocaleString()}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
