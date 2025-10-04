import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const RatingChart = ({ reviews }) => {
  // Calculate rating distribution
  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  reviews.forEach(review => {
    ratingCounts[review.rating]++;
  });

  // Prepare data for chart
  const data = Object.entries(ratingCounts).map(([rating, count]) => ({
    rating: `${rating} Star${rating !== '1' ? 's' : ''}`,
    count,
    percentage: reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0
  }));

  // Colors for bars (teal theme)
  const colors = ['#4A9082', '#5BA394', '#6CB6A6', '#7DC9B8', '#8EDCCA'];

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="card p-3 border border-gray-300 shadow-lg">
          <p className="text-text-dark font-medium">{label}</p>
          <p className="text-teal font-medium">
            {payload[0].value} reviews ({payload[0].payload.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="rating" 
            tick={{ fill: '#2F2F2F', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#A67B5B' }}
          />
          <YAxis 
            tick={{ fill: '#2F2F2F', fontSize: 12, fontWeight: 500 }}
            axisLine={{ stroke: '#A67B5B' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="count" 
            radius={[6, 6, 0, 0]}
            animationDuration={800}
            animationBegin={200}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingChart;