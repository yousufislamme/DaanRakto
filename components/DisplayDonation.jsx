import { useMyContext } from "../Context/Context";

const DisplayDonation = () => {
  const { donationData } = useMyContext(); // Access the donation data from context

  if (!donationData) {
    return <div>No donation data available.</div>;
  }

  return (
    <div className="px-10 py-5">
      <h1 className="text-2xl">Donation Details</h1>
      <p>
        <strong>Name:</strong> {donationData.name}
      </p>
      <p>
        <strong>Blood Type:</strong> {donationData.bloodType}
      </p>
      <p>
        <strong>Division:</strong> {donationData.division}
      </p>
      <p>
        <strong>Phone Number:</strong> {donationData.phoneNumber}
      </p>
      <p>
        <strong>Dhaka Area:</strong> {donationData.dhakaArea}
      </p>
    </div>
  );
};

export default DisplayDonation;
