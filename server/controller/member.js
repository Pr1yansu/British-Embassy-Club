const QRCode = require("qrcode");
const MemberSchema = require("../models/members.js");
const WalletSchema = require("../models/wallet.js");
const TransactionSchema = require("../models/transaction.js");
const { uploadImage, deleteImage } = require("../utils/cloudinary.js");
const { MemberFilter } = require("../utils/filters");
const Cache = require("node-cache");
const pdf = require("html-pdf-node");
const { sendMail } = require("../utils/mail-service.js");
const { v4: uuidv4 } = require("uuid");

const cache = new Cache();

exports.addMember = async (req, res) => {
  try {
    const {
      firstName,
      lastname,
      name,
      email,
      mobileNumber,
      address,
      expiryDate,
      bloodGroup,
      organization,
      idType,
      idNumber,
      url,
      public_id,
    } = req.body;

    const mobileNumberPattern = /^[0-9]{10}$/;

    if (!mobileNumberPattern.test(mobileNumber)) {
      return res.status(400).json({
        statusCode: 400,
        message: "Invalid mobile number",
        exception: null,
        data: null,
      });
    }

    const existingUser = await MemberSchema.findOne({ mobileNumber });
    if (existingUser) {
      return res.status(400).json({
        statusCode: 400,
        message: "Member already exists",
        exception: null,
        data: null,
      });
    }

    const memberId = `BCK${uuidv4().substring(0, 6)}`;

    const member = new MemberSchema({
      _id: memberId.replace(/\s/g, ""),
      firstname: firstName,
      lastname: lastname,
      fullname: firstName + " " + lastname,
      name,
      mobileNumber,
      address,
      email,
      idProof: {
        idType,
        idNumber,
      },
      expiryDate,
      bloodGroup,
      organization,
      image: {
        url,
        public_id,
      },
      timeStamp: new Date(),
    });

    const wallet = await WalletSchema.create({
      memberId: memberId.replace(/\s/g, ""),
    });

    member.wallet = wallet._id;

    await member.save();

    if (!member || !wallet) {
      return res.status(400).json({
        statusCode: 400,
        message: "Member not added",
        exception: null,
        data: null,
      });
    }

    const formattedExpiryDate = new Date(expiryDate).toDateString();

    const subject = "Welcome to the British Club Kolkata!";
    const emailBody = `
      <p>Dear ${member.fullname},</p>
      <p>We are delighted to welcome you to the British Club Kolkata! Your membership has been successfully registered.</p>
      <p><strong>Membership Details:</strong></p>
      <ul>
        <li><strong>Membership ID:</strong> ${member._id}</li>
        <li><strong>Membership Validity:</strong> ${formattedExpiryDate}</li>
      </ul>
      <p>As a member, you now have access to our exclusive events, facilities, and community activities. We look forward to your active participation and hope you make the most of your time with us.</p>
      <p>Once again, welcome to the British Club Kolkata family! If you have any questions or need assistance, feel free to reach out to us at any time.</p>
      <p>Best regards,<br>
      ${currentUser}<br>
      Membership Coordinator<br>
      British Club Kolkata<br>
      http://www.britishclubkolkata.com<br>
      </p>
    `;

    await sendMail(member.email, subject, emailBody);

    return res.status(201).json({
      statusCode: 201,
      message: "Member added successfully",
      exception: null,
      data: {
        member,
        wallet,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const member = await MemberSchema.findByIdAndDelete(memberId);
    if (!member) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }
    await deleteImage(member.image.public_id);

    await WalletSchema.findOneAndDelete({ memberId: member._id });

    cache.del(memberId);

    return res.status(200).json({
      statusCode: 200,
      message: "Member deleted successfully",
      exception: null,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

exports.updateMember = async (req, res) => {
  try {
    const { memberId } = req.params;
    const {
      firstName,
      lastname,
      mobileNumber,
      bloodGroup,
      organization,
      address,
      email,
      expiryDate,
      timeStamp,
      idNumber,
      idType,
      username,
    } = req.body;

    const memberData = await MemberSchema.findById(memberId);

    if (!memberData) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }

    const fullname = firstName + " " + lastname;

    const member = await MemberSchema.findByIdAndUpdate(memberId, {
      firstname: firstName ? firstName : memberData.firstname,
      lastname: lastname ? lastname : memberData.lastname,
      fullname: fullname ? fullname : memberData.fullname,

      mobileNumber: mobileNumber ? mobileNumber : memberData.mobileNumber,
      address: address ? address : memberData.address,
      idProof: {
        idType: idType ? idType : memberData.idType,
        idNumber: idNumber ? idNumber : memberData.idNumber,
      },
      expiryTime: expiryDate ? expiryDate : memberData.expiryTime,
      timeStamp: timeStamp ? timeStamp : memberData.timeStamp,
      bloodGroup: bloodGroup ? bloodGroup : memberData.bloodGroup,
      organization: organization ? organization : memberData.organization,
      username: username ? username : memberData.username,
      email: email ? email : memberData.email,
      expired:
        expiryDate &&
        new Date(memberData.expiryTime).getTime() < new Date().getTime()
          ? false
          : memberData.expired,
    });

    if (!member) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }

    if (expiryDate) {
      const wallet = await WalletSchema.findOneAndUpdate(
        { memberId: member._id },
        {
          expired: new Date(expiryDate).getTime() < new Date().getTime(),
        }
      );
      if (!wallet) {
        return res.status(404).json({
          statusCode: 404,
          message: "Wallet not found",
          exception: null,
          data: null,
        });
      }

      const formattedExpiryDate = new Date(expiryDate).toDateString();

      const subject = "Membership Renewed";
      const emailBody = `
        <p>Dear ${member.fullname},</p>
        <p>Your membership has been successfully renewed. Your new expiry date is ${formattedExpiryDate}.</p>
        <p>If you have any questions or need assistance, feel free to reach out to us at any time.</p>
        <p>Best regards,<br>
        Membership Coordinator<br>
        British Club Kolkata<br>
        http://www.britishclubkolkata.com<br>
        </p>
      `;

      await sendMail(member.email, subject, emailBody);
    }

    cache.del(memberId, member);

    return res.status(200).json({
      statusCode: 200,
      message: "Member updated successfully",
      exception: null,
      data: member,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

exports.updateImage = async (req, res) => {
  try {
    const { memberId } = req.params;
    const file = req.files;

    const memberData = await MemberSchema.findById(memberId);

    if (!memberData) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }

    let image = memberData.image;
    if (file && file.image) {
      await deleteImage(memberData.image.public_id);
      image = await uploadImage({
        file: file.image,
        folder: "members",
        name: memberData.name,
      });
    }

    if (!image) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image not uploaded",
        exception: null,
        data: null,
      });
    }

    const member = await MemberSchema.findByIdAndUpdate(memberId, {
      image: {
        url: image.url,
        public_id: image.public_id,
      },
    });

    if (!member) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Image updated successfully",
      exception: null,
      data: member,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

exports.getMembers = async (req, res) => {
  try {
    const totalMembers = await MemberSchema.find().countDocuments();
    const filter = new MemberFilter(req.query).filter().sort().paginate();
    const members = await filter.exec();

    return res.status(200).json({
      statusCode: 200,
      message: "Members found",
      totalMembers: totalMembers,
      exception: null,
      data: members,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

exports.addMemberImage = async (req, res) => {
  try {
    const file = req.files;

    if (!file || !file.image) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image not uploaded",
        exception: null,
        data: null,
      });
    }

    const image = await uploadImage({
      file: file.image,
      folder: "members",
    });

    if (!image) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image not uploaded",
        exception: null,
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      data: {
        image: image.url,
        public_id: image.public_id,
      },
      exception: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

const generateQRCode = async (frontendUrl) => {
  try {
    const qrCode = await QRCode.toDataURL(frontendUrl);
    return qrCode;
  } catch (error) {
    console.log(error);
    return null;
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const { memberId } = req.params;
    const randomSecret = Math.random().toString(36).substring(7);
    const frontendUrl = `${process.env.FRONTEND_URL}/member/data/${randomSecret}/${memberId}`;

    const member = await MemberSchema.findById(memberId).populate("wallet");
    if (!member) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }
    const qrCode = await generateQRCode(frontendUrl);
    return res.status(200).json({
      statusCode: 200,
      message: "Member found",
      exception: null,
      data: member,
      qrCode: qrCode,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      exception: error,
      data: null,
    });
  }
};

exports.downloadCardPdf = async (req, res) => {
  try {
    const { frontImage: frontimage, backImage: backimage } = req.body;

    if (!frontimage || !backimage) {
      return res.status(400).json({
        statusCode: 400,
        message: "Image not provided",
        data: null,
      });
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Virtual Card</title>
        <style>
          body, html {
            height: 100%;
            margin: 0;
            background-color: #f3f4f6;
          }
          .card-container {
            width: 100%;
            max-width: 400px;
            margin: 20px auto;
            padding: 20px;
            background: white;
            border-radius: 8px;
            text-align: center;
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 8px;
            border: 1px solid #e1e1e1;
          }
        </style>
      </head>
      <body>
        <div class="card-container">
          <img src="${frontimage}" alt="Virtual Card Front"/>
        </div>
        <div class="card-container">
          <img src="${backimage}" alt="Virtual Card Back"/>
        </div>
      </body>
      </html>
    `;

    try {
      const file = { content: htmlContent };
      const buffer = await pdf.generatePdf(file, { format: "A4" });

      res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=virtual-card.pdf",
      });
      res.end(buffer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        statusCode: 500,
        message: "Failed to create PDF",
        data: null,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to process request",
      data: null,
    });
  }
};

exports.sendCardAsEmail = async (req, res) => {
  try {
    const { email, frontImage, backImage } = req.body;
    if (!email || !frontImage || !backImage) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email or image not provided",
        exception: null,
        data: null,
      });
    }

    const member = await MemberSchema.findOne({
      email: email,
    });

    if (!member) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }

    const attachment = [
      {
        filename: "frontImage.png",
        content: frontImage.split("base64,")[1],
        encoding: "base64",
        cid: "frontImage",
      },
      {
        filename: "backImage.png",
        content: backImage.split("base64,")[1],
        encoding: "base64",
        cid: "backImage",
      },
    ];

    const htmlContent = `
      <html>
  <body>
    <h1>Virtual Membership Card</h1>
    <div>
      <span>${member.firstname}</span> 
      <span>${member.lastname}</span>
    </div>
    <p>Attached, you will find your digital membership card. Please keep it handy for easy access to club services and events.</p>
    <img src="cid:frontImage" alt="Front Image" 
      style="margin-top: 20px; width: 100%; max-width:360px; height: auto; border-radius: 8px; border: 1px solid #e1e1e1; margin-left: 20px;"
    />
    <img src="cid:backImage" alt="Back Image" 
      style="margin-top: 20px; width: 100%; max-width:360px; height: auto; border-radius: 8px; border: 1px solid #e1e1e1; margin-left: 20px;"
    />
    <p>If you have any questions or need assistance, feel free to reach out to us at any time.</p>
    <p>Best regards,<br>
    Membership Coordinator<br>
    British Club Kolkata<br>
    http://www.britishclubkolkata.com</p>
  </body>
</html>
    `;

    const response = await sendMail(
      email,
      "Virtual Card",
      "Virtual Card",
      htmlContent,
      attachment
    );

    if (!response) {
      return res.status(400).json({
        statusCode: 400,
        message: "Failed to send email",
        exception: null,
        data: null,
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: "Email sent successfully",
      exception: null,
      data: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to send email",
      exception: error,
      data: null,
    });
  }
};

exports.sendReminderBeforeOneMonth = async (req, res) => {
  try {
    const members = await MemberSchema.find({
      expiryDate: {
        $gte: new Date(),
        $lte: new Date(new Date().setDate(new Date().getDate() + 30)),
      },
    });

    if (!members) {
      return res.status(404).json({
        statusCode: 404,
        message: "No members found",
        exception: null,
        data: null,
      });
    }

    const htmlContent = `
      <html>
        <body>
          <h1>Membership Expiry Reminder</h1>
          <p>Your membership is about to expire in 30 days. Please renew your membership.</p>
        </body>
      </html>
    `;

    members.forEach(async (member) => {
      await sendMail(
        member.email,
        "Membership Expiry Reminder",
        "Membership Expiry Reminder",
        htmlContent
      );
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Reminder sent successfully",
      exception: null,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to send reminder",
      exception: error,
      data: null,
    });
  }
};

exports.sendReminderBeforeOneWeek = async (req, res) => {
  try {
    const members = await MemberSchema.find({
      expiryDate: {
        $gte: new Date(),
        $lte: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
    });

    if (!members) {
      return res.status(404).json({
        statusCode: 404,
        message: "No members found",
        exception: null,
        data: null,
      });
    }

    const htmlContent = `
      <html>
        <body>
          <h1>Membership Expiry Reminder</h1>
          <p>Your membership is about to expire in 7 days. Please renew your membership.</p>
        </body>
      </html>
    `;

    members.forEach(async (member) => {
      await sendMail(
        member.email,
        "Membership Expiry Reminder",
        "Membership Expiry Reminder",
        htmlContent
      );
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Reminder sent successfully",
      exception: null,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to send reminder",
      exception: error,
      data: null,
    });
  }
};

exports.sendReminderBeforeOneDay = async (req, res) => {
  try {
    const members = await MemberSchema.find({
      expiryDate: {
        $gte: new Date(),
        $lte: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
    });

    if (!members) {
      return res.status(404).json({
        statusCode: 404,
        message: "No members found",
        exception: null,
        data: null,
      });
    }

    const htmlContent = `
      <html>
        <body>
          <h1>Membership Expiry Reminder</h1>
          <p>Your membership is about to expire in 1 day. Please renew your membership.</p>
        </body>
      </html>
    `;

    members.forEach(async (member) => {
      await sendMail(
        member.email,
        "Membership Expiry Reminder",
        "Membership Expiry Reminder",
        htmlContent
      );
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Reminder sent successfully",
      exception: null,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to send reminder",
      exception: error,
      data: null,
    });
  }
};

exports.expireMemberships = async (req, res) => {
  try {
    const currentDate = new Date();
    const members = await MemberSchema.find({
      expiryDate: {
        $lte: currentDate,
      },
    });

    if (!members) {
      return res.status(404).json({
        statusCode: 404,
        message: "No members found",
        exception: null,
        data: null,
      });
    }

    members.forEach(async (member) => {
      if (member.expiryTime < currentDate) {
        await MemberSchema.findByIdAndUpdate(member._id, {
          expired: true,
        });
      }
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Memberships expired successfully",
      exception: null,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to expire memberships",
      exception: error,
      data: null,
    });
  }
};

exports.totalDebitCreditAndWalletBalance = async (req, res) => {
  try {
    const totalDebit = await TransactionSchema.aggregate([
      {
        $group: {
          _id: null,
          totalDebit: { $sum: "$debitAmount" },
        },
      },
    ]);

    const totalCredit = await TransactionSchema.aggregate([
      {
        $group: {
          _id: null,
          totalCredit: { $sum: "$creditAmount" },
        },
      },
    ]);

    const totalWalletBalance = await WalletSchema.aggregate([
      {
        $group: {
          _id: null,
          totalWalletBalance: { $sum: "$balance" },
        },
      },
    ]);

    const totalExpiredWalletBalance = await WalletSchema.aggregate([
      {
        $match: {
          expired: true,
        },
      },
      {
        $group: {
          _id: null,
          totalExpiredWalletBalance: { $sum: "$balance" },
        },
      },
    ]);

    const totalActiveWalletBalance = await WalletSchema.aggregate([
      {
        $match: {
          expired: false,
        },
      },
      {
        $group: {
          _id: null,
          totalActiveWalletBalance: { $sum: "$balance" },
        },
      },
    ]);

    return res.status(200).json({
      statusCode: 200,
      message: "Total Debit, Credit and Wallet Balance",
      exception: null,
      data: {
        totalDebit: totalDebit[0].totalDebit,
        totalCredit: totalCredit[0].totalCredit,
        totalWalletBalance: totalWalletBalance[0].totalWalletBalance,
        totalExpiredWalletBalance:
          totalExpiredWalletBalance[0].totalExpiredWalletBalance,
        totalActiveWalletBalance:
          totalActiveWalletBalance[0].totalActiveWalletBalance,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to fetch data",
      exception: error,
      data: null,
    });
  }
};

exports.renewMembership = async (req, res) => {
  try {
    const { memberId, expiryDate } = req.body;
    const member = await MemberSchema.findById(memberId);
    if (!member) {
      return res.status(404).json({
        statusCode: 404,
        message: "Member not found",
        exception: null,
        data: null,
      });
    }
    const updatedMember = await MemberSchema.findByIdAndUpdate(memberId, {
      expiryDate: expiryDate,
      expired: false,
    });
    if (!updatedMember) {
      return res.status(400).json({
        statusCode: 400,
        message: "Failed to renew membership",
        exception: null,
        data: null,
      });
    }

    await WalletSchema.findOneAndUpdate(
      { memberId: member._id },
      {
        expired: false,
      }
    );

    sendMail(
      member.email,
      "Membership Renewed",
      "Membership Renewed",
      `Your membership has been renewed successfully. Your new expiry date is ${new Date(
        expiryDate
      ).toDateString()}.`
    );

    return res.status(200).json({
      statusCode: 200,
      message: "Membership renewed successfully",
      exception: null,
      data: updatedMember,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to renew membership",
      exception: error,
      data: null,
    });
  }
};

exports.expireWalletAfterOneMonthOfMembershipExpiry = async (req, res) => {
  try {
    const members = await MemberSchema.find({
      expiryDate: {
        expired: true,
      },
    });

    if (!members) {
      return res.status(404).json({
        statusCode: 404,
        message: "No members found",
        exception: null,
        data: null,
      });
    }

    const currentDate = new Date();

    members.forEach(async (member) => {
      if (member.expiryTime < currentDate + 30) {
        await WalletSchema.findOneAndUpdate(
          { memberId: member._id },
          {
            expired: true,
          }
        );
      }
    });

    return res.status(200).json({
      statusCode: 200,
      message: "Wallets expired successfully",
      exception: null,
      data: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      statusCode: 500,
      message: "Failed to expire wallets",
      exception: error,
      data: null,
    });
  }
};
