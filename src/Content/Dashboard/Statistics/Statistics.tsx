import { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Heading,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Spinner,
  Center,
  Text,
} from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

import { StatisticsAggregation, emptyStatistics } from '../../../Models/Statistics';
import { getStatistics } from '../../../Helpers/StatisticsHelper';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Statistics = () => {
  const [stats, setStats] = useState<StatisticsAggregation>(emptyStatistics);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getStatistics();
        setStats(data || emptyStatistics);
        setError(null);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    // Refresh stats every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Center h="400px">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="400px">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  const deviceData = Object.entries(stats.visitsByDevice || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const countryData = Object.entries(stats.visitsByCountry || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, value]) => ({
      name,
      value,
    }));

  return (
    <Box p={5}>
      <Heading mb={5}>Site Statistics</Heading>

      <StatGroup mb={5}>
        <Stat>
          <StatLabel>Total Visits</StatLabel>
          <StatNumber>{stats.totalVisits}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Unique Visitors</StatLabel>
          <StatNumber>{stats.uniqueVisitors}</StatNumber>
        </Stat>
        <Stat>
          <StatLabel>Avg. Time Spent</StatLabel>
          <StatNumber>{Math.round(stats.averageTimeSpent)}s</StatNumber>
        </Stat>
      </StatGroup>

      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Heading size="md" mb={4}>Daily Visits</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.dailyVisits || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="visits" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Heading size="md" mb={4}>Device Distribution</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {deviceData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Heading size="md" mb={4}>Top Countries</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={countryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {countryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>

        <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
          <Heading size="md" mb={4}>Popular Pages</Heading>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(stats.visitsByRoute || {}).map(([name, value]) => ({
                  name,
                  value,
                }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {Object.keys(stats.visitsByRoute || {}).map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Box>
  );
};

export default Statistics;
