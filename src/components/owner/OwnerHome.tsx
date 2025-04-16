import React from 'react';

type Sale = {
  id: number;
  product: string;
  customer: string;
  date: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Cancelled';
};

const OwnerHome: React.FC = () => {
  // Sample sales data
  const sales: Sale[] = [
    { id: 1, product: 'Premium Headphones', customer: 'John Smith', date: '2023-05-15', amount: 199.99, status: 'Completed' },
    { id: 2, product: 'Smart Watch', customer: 'Emily Johnson', date: '2023-05-16', amount: 249.99, status: 'Pending' },
    { id: 3, product: 'Wireless Earbuds', customer: 'Michael Brown', date: '2023-05-14', amount: 129.99, status: 'Completed' },
    { id: 4, product: 'Bluetooth Speaker', customer: 'Sarah Davis', date: '2023-05-17', amount: 89.99, status: 'Completed' },
    { id: 5, product: 'Premium Headphones', customer: 'Robert Wilson', date: '2023-05-16', amount: 199.99, status: 'Cancelled' },
    { id: 6, product: 'Smart Watch', customer: 'Jessica Lee', date: '2023-05-18', amount: 249.99, status: 'Pending' },
  ];

  const totalSales = sales.reduce((sum, sale) => sum + (sale.status === 'Completed' ? sale.amount : 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Sales Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Summary Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-semibold text-gray-900">${totalSales.toFixed(2)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Completed Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sales.filter(s => s.status === 'Completed').length}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {sales.filter(s => s.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>

        {/* Sales Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sales.map((sale) => (
                  <tr key={sale.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${sale.amount.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sale.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        sale.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OwnerHome;